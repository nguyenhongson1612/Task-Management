# Stage 1: dùng image Maven chính thức (không apk install maven mỗi lần)
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Cache layer dependencies — chỉ tải lại khi pom.xml đổi
COPY pom.xml .
RUN mvn -q -B dependency:go-offline

COPY src ./src
RUN mvn -q -B -DskipTests package

# Stage 2: image chạy nhẹ (chỉ JRE + jar)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN apk add --no-cache wget
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
