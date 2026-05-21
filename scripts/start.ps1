# Chạy toàn bộ stack — không cần Maven / Node trên máy
Set-Location $PSScriptRoot\..
docker compose up -d --build
Write-Host ""
Write-Host "Frontend : http://localhost:5173"
Write-Host "Backend  : http://localhost:8080"
Write-Host ""
Write-Host "Xem log  : docker compose logs -f"
Write-Host "Dung     : docker compose down"
