# Docker デプロイガイド

## アクセスURL

```
http://localhost
または
http://<デプロイ先サーバーのIPアドレス>
```

---

## 前提条件

| 項目 | 要件 |
|------|------|
| Docker | Docker Desktop または Docker Engine (Compose v2 同梱) |
| MySQL | 既存サーバー `192.168.0.17:3306` が起動済みであること |
| DB接続 | Dockerホストから `192.168.0.17:3306` に疎通できること |

---

## ソースコード変更 (デプロイ前に必須)

以下の変更が**すでに適用済み**です。
初回デプロイ前に必ず確認してください。

---

### 1. フロントエンド API URL (環境変数化)

**ファイル:** `frontend/src/constants/const.tsx`

```typescript
// 変更後 (環境変数で切り替え)
export const SERVICE_URL = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/"
}
```

**ファイル:** `frontend/.env.production` (新規作成)

```env
VITE_API_BASE_URL=/
```

> **動作:** `npm run build` (本番ビルド) 時は自動で `.env.production` が読み込まれ、
> `BASE_URL` が `/` になります。
> ブラウザは `http://サーバーIP/api/todoList` のように同一オリジンへリクエストし、
> nginx がバックエンドに転送します。
> ローカル開発では `.env` の `http://localhost:8080/` が使われます。

---

### 2. バックエンド CORS 設定

**ファイル:** `backend/src/main/java/com/example/backend/config/WebConfig.java`

```java
// 変更後
registry.addMapping("/**")
        .allowedOriginPatterns("*")   // ← allowedOrigins("http://localhost:5173") から変更
        .allowedMethods("*")
        .allowedHeaders("*")
        .allowCredentials(true);
```

> **理由:** Docker 環境では nginx プロキシ経由で Origin が変わるため許可範囲を拡大。
> `allowedOriginPatterns("*")` は `allowCredentials(true)` と併用できます。

---

## ディレクトリ構成

```
todoList/
├── backend/                  ← Spring Boot (WAR ビルド)
├── frontend/                 ← React + Vite
│   ├── .env                  ← ローカル開発用 (VITE_API_BASE_URL=http://localhost:8080/)
│   └── .env.production       ← Dockerビルド用 (VITE_API_BASE_URL=/)
└── Doc/Deploy/
    ├── README.md             ← このファイル
    ├── docker-compose.yml
    ├── backend/
    │   └── Dockerfile
    └── frontend/
        ├── Dockerfile
        └── nginx.conf
```

---

## 起動手順

### 1. docker-compose.yml の DB 接続先を確認

`Doc/Deploy/docker-compose.yml` の以下の値が実際の MySQL サーバーと一致しているか確認します。

```yaml
environment:
  SPRING_DATASOURCE_URL: "jdbc:mysql://192.168.0.17:3306/tododb?useSSL=false&serverTimezone=Asia/Tokyo&allowPublicKeyRetrieval=true"
  SPRING_DATASOURCE_USERNAME: yama
  SPRING_DATASOURCE_PASSWORD: yama
```

IP アドレス・ユーザー・パスワードが異なる場合はここを変更してください。

---

### 2. Docker Compose でビルド＆起動

```bash
# リポジトリルート (todoList/ の親) から実行する場合
cd todoList/Doc/Deploy

# または Doc/Deploy/ ディレクトリに移動済みの場合
docker compose up -d --build
```

初回はイメージビルドに数分かかります。

---

### 3. 動作確認

```bash
# コンテナの状態確認
docker compose ps

# ログ確認
docker compose logs backend
docker compose logs frontend
```

---

### 4. ブラウザでアクセス

```
http://localhost
```

サーバー上にデプロイした場合はサーバーの IP アドレスでアクセスします。

---

## 停止・削除

```bash
# コンテナ停止 (イメージは残る)
docker compose down

# コンテナ＋イメージも削除する場合
docker compose down --rmi all
```

---

## 構成図

```
ブラウザ
  │
  │ http://localhost (port 80)
  ▼
┌─────────────────────────────────┐
│  nginx (frontend コンテナ)       │
│                                 │
│  /          → React 静的配信     │
│  /api/*     → proxy_pass        │
└──────────────┬──────────────────┘
               │ http://backend:8080/api/*
               ▼
┌─────────────────────────────────┐
│  Spring Boot (backend コンテナ)  │
│  WAR デプロイ / port 8080        │
│  (外部には公開しない)             │
└──────────────┬──────────────────┘
               │ JDBC
               ▼
┌─────────────────────────────────┐
│  MySQL (既存サーバー)             │
│  192.168.0.17:3306              │
└─────────────────────────────────┘
```

---

## トラブルシューティング

| 症状 | 確認箇所 |
|------|---------|
| 画面が表示されない | `docker compose logs frontend` で nginx エラー確認 |
| API エラーが出る | `docker compose logs backend` で Spring Boot エラー確認 |
| DB 接続エラー | `docker-compose.yml` の `SPRING_DATASOURCE_URL` の IP・認証情報を確認 |
| ビルドエラー (backend) | JDK17 / Gradle のビルドログ確認 |
| ビルドエラー (frontend) | `npm ci` のエラーログ確認 |
| API が 404 になる | nginx.conf の `proxy_pass http://backend:8080;` を確認 (末尾スラッシュなし) |
