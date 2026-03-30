# ============================================================
# Frontend Dockerfile
# ビルドコンテキスト: todoList/ ディレクトリ
# ============================================================

# ===================================
# Stage 1: Node.js ビルド
# ===================================
FROM node:20-alpine AS builder

WORKDIR /app

# 依存関係を先にコピー (キャッシュ活用)
COPY frontend/package*.json ./
RUN npm ci

# ソースをコピーしてビルド
COPY frontend/ .
RUN npm run build

# ===================================
# Stage 2: nginx でフロントエンド配信 + API プロキシ
# ===================================
FROM nginx:1.27-alpine

# ビルド成果物をコピー
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 設定をコピー (リバースプロキシ設定含む)
COPY Doc/Deploy/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
