# ============================================================
# Backend Dockerfile
# ビルドコンテキスト: todoList/ ディレクトリ
# ============================================================

# ===================================
# Stage 1: Gradle ビルド
# ===================================
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

# Gradle ラッパーと依存関係定義を先にコピー (キャッシュ活用)
COPY backend/gradlew backend/settings.gradle backend/build.gradle ./
COPY backend/gradle ./gradle
RUN chmod +x gradlew

# ソースコードをコピーしてビルド
COPY backend/src ./src
RUN ./gradlew bootWar -x test --no-daemon

# ===================================
# Stage 2: 実行イメージ (JRE のみ)
# ===================================
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=builder /app/build/libs/backend.war app.war

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.war"]
