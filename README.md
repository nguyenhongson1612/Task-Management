# Task Management

Monorepo **Backend (Spring Boot) + Frontend (Vue 3) + PostgreSQL** — chạy hoàn toàn bằng **Docker**, không cần cài Maven hay Node.js trên máy.

## Chỉ cần cài

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Maven và npm chỉ chạy **bên trong container** khi build image — bạn không cần cài chúng.

## Chạy dự án (một lệnh)

```powershell
cd task_management_java
docker compose up -d --build
```

Hoặc dùng script (Windows):

```powershell
.\scripts\start.ps1
```

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend** | http://localhost:8080 |
| **PostgreSQL** | `localhost:5432` (user: `taskuser`, pass: `taskpass`, db: `taskdb`) |

## Lệnh thường dùng

```powershell
# Xem log tất cả services
docker compose logs -f

# Xem log riêng backend / frontend
docker compose logs -f app
docker compose logs -f frontend

# Dừng (giữ dữ liệu DB)
docker compose down

# Dừng và xóa volume DB
docker compose down -v

# Build lại sau khi sửa code Java
docker compose up -d --build app

# Build lại sau khi sửa code Vue
docker compose up -d --build frontend

# Build lại toàn bộ
docker compose up -d --build
```

Script tiện ích (Windows):

| Script | Mô tả |
|--------|-------|
| `scripts\start.ps1` | `docker compose up -d --build` |
| `scripts\stop.ps1` | `docker compose down` |
| `scripts\rebuild-backend.ps1` | Build lại backend |
| `scripts\rebuild-frontend.ps1` | Build lại frontend |

## Cách build hoạt động (không cần Maven local)

```
Dockerfile (root)     → cài Maven trong container → mvn package → chạy .jar
frontend/Dockerfile   → cài npm trong container   → npm run build → Nginx
```

Bạn sửa code → chạy `docker compose up -d --build` (hoặc `--build app` / `frontend`) → Docker build lại image.

## Cấu trúc thư mục

```
task_management_java/
├── pom.xml, Dockerfile, src/     # Backend
├── frontend/                     # Vue 3
├── docker-compose.yml            # Postgres + App + Frontend
├── docker-compose.dev.yml        # (tùy chọn) chỉ Postgres
└── scripts/                      # Helper PowerShell
```

## Kiểm tra API

```powershell
curl http://localhost:8080/api/health
curl http://localhost:8080/actuator/health
```

Hoặc mở http://localhost:5173 — trang Vue tự kiểm tra backend.

## Cấu hình (tùy chọn)

Copy `.env.example` → `.env` nếu muốn đổi biến môi trường. Docker Compose đã set sẵn kết nối DB.

| Biến | Mặc định |
|------|----------|
| `DB_NAME` | `taskdb` |
| `DB_USER` | `taskuser` |
| `DB_PASSWORD` | `taskpass` |
| `SERVER_PORT` | `8080` |

## Dev local không dùng Docker? (không bắt buộc)

Chỉ dùng khi bạn **muốn** hot-reload nhanh và đã cài Java/Maven/Node:

- `mvn spring-boot:run` — backend
- `cd frontend && npm run dev` — frontend
- `docker compose -f docker-compose.dev.yml up -d` — chỉ Postgres

**Khuyến nghị:** dùng `docker compose up -d --build` — đủ cho hầu hết trường hợp.

## API hiện có

| Method | Path |
|--------|------|
| `GET` | `/api/health` |
| `GET` | `/actuator/health` |
| `GET` | `/actuator/info` |

## Roadmap

- [ ] Entity & CRUD Task
- [ ] UI Vue cho task
- [ ] JWT Authentication
- [ ] Flyway migration
