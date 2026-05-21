# Task Management API

REST API backend xây dựng bằng **Spring Boot 3**, kết nối **PostgreSQL**, chạy bằng **Docker**, có sẵn endpoint kiểm tra health.

## Tech stack

| Thành phần | Phiên bản / Ghi chú |
|------------|---------------------|
| Java | 21 |
| Spring Boot | 3.4.5 |
| PostgreSQL | 16 (Alpine image) |
| Build tool | Maven |
| Container | Docker & Docker Compose |

## Yêu cầu

Chọn **một** trong hai cách chạy:

| Cách | Cần cài |
|------|---------|
| Docker (khuyên dùng) | [Docker Desktop](https://www.docker.com/products/docker-desktop/) |
| Local | Java 21, Maven 3.9+, Docker (chỉ cho Postgres) |

## Cấu trúc thư mục

```
task_management_java/
├── pom.xml                         # Dependencies & build Maven
├── Dockerfile                      # Build image Spring Boot
├── docker-compose.yml              # Postgres + App
├── docker-compose.dev.yml          # Chỉ Postgres (dev local)
├── .env.example                    # Mẫu biến môi trường
└── src/main/
    ├── java/com/taskmanagement/
    │   ├── TaskManagementApplication.java
    │   └── controller/HealthController.java
    └── resources/
        ├── application.yml
        └── application-docker.yml
```

## Chạy nhanh (Docker)

```bash
# Clone / vào thư mục dự án
cd task_management_java

# Build và chạy Postgres + App
docker compose up -d

# Xem log
docker compose logs -f app
```

Ứng dụng chạy tại: **http://localhost:8080**

### Kiểm tra health

```bash
# Actuator — kiểm tra app, database, disk, ...
curl http://localhost:8080/actuator/health

# API health — endpoint đơn giản cho client
curl http://localhost:8080/api/health
```

Ví dụ response `/api/health`:

```json
{
  "status": "UP",
  "service": "task-management"
}
```

### Dừng services

```bash
docker compose down

# Dừng và xóa volume (mất dữ liệu DB)
docker compose down -v
```

## Chạy local (develop trên máy)

### Bước 1: Chạy PostgreSQL

```bash
docker compose -f docker-compose.dev.yml up -d
```

### Bước 2: Cấu hình biến môi trường (tùy chọn)

```bash
cp .env.example .env
# Chỉnh sửa .env nếu cần
```

### Bước 3: Chạy Spring Boot

```bash
mvn spring-boot:run
```

Hoặc mở project trong IDE (IntelliJ / VS Code) và chạy `TaskManagementApplication`.

## Cấu hình

### Biến môi trường

| Biến | Mặc định | Mô tả |
|------|----------|-------|
| `DB_HOST` | `localhost` | Host PostgreSQL |
| `DB_PORT` | `5432` | Cổng PostgreSQL |
| `DB_NAME` | `taskdb` | Tên database |
| `DB_USER` | `taskuser` | Username |
| `DB_PASSWORD` | `taskpass` | Password |
| `SERVER_PORT` | `8080` | Cổng HTTP của app |

Trong Docker Compose (`docker-compose.yml`), app dùng profile `docker` và host DB là `postgres` (tên service).

### Database mặc định

| Thuộc tính | Giá trị |
|------------|---------|
| Database | `taskdb` |
| User | `taskuser` |
| Password | `taskpass` |
| Port (host) | `5432` |

> **Lưu ý:** Không commit file `.env` chứa mật khẩu thật. File này đã được thêm vào `.gitignore`.

## Health check

| Endpoint | Mục đích |
|----------|----------|
| `GET /actuator/health` | Spring Actuator — kiểm tra app, kết nối DB, disk space, ping |
| `GET /api/health` | Endpoint API tùy chỉnh — response JSON gọn cho frontend / gateway |

Docker healthcheck của container `app` gọi `/actuator/health` để xác nhận service đang hoạt động.

## Build

### Build bằng Maven

```bash
mvn clean package -DskipTests
java -jar target/task-management-0.0.1-SNAPSHOT.jar
```

### Build image Docker

```bash
docker compose build
```

## Lệnh Docker hữu ích

```bash
# Chỉ rebuild app
docker compose up -d --build app

# Vào shell container Postgres
docker exec -it task-management-postgres psql -U taskuser -d taskdb

# Xem trạng thái health của containers
docker compose ps
```

## API hiện có

| Method | Path | Mô tả |
|--------|------|-------|
| `GET` | `/api/health` | Health check API |
| `GET` | `/actuator/health` | Health check (Actuator) |
| `GET` | `/actuator/info` | Thông tin ứng dụng |

## Roadmap

- [ ] Entity & Repository (Task, User, …)
- [ ] REST API CRUD
- [ ] Authentication (JWT)
- [ ] Database migration (Flyway / Liquibase)

## License

Private project — cập nhật khi cần.
