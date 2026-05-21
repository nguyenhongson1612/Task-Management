# Backend + DB trong Docker, không chạy container frontend
Set-Location $PSScriptRoot\..

docker compose stop frontend 2>$null
docker compose rm -f frontend 2>$null

docker compose -f docker-compose.dev.yml up -d --build

Write-Host ""
Write-Host "Backend API : http://localhost:8080"
Write-Host "PostgreSQL  : localhost:5432"
Write-Host ""
Write-Host "Frontend (terminal khac):"
Write-Host "  cd frontend"
Write-Host "  npm run dev"
Write-Host "  -> http://localhost:5173"
