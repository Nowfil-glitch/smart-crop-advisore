@echo off
setlocal EnableExtensions EnableDelayedExpansion

echo Starting Smart Crop Advisor demo (PRODUCTION frontend)...
echo.

REM Find a free backend port starting at 4000 and free frontend port starting at 3000.
REM Uses PowerShell Get-NetTCPConnection (Windows 10+).
for /f "usebackq delims=" %%p in (`powershell -NoProfile -ExecutionPolicy Bypass -Command "$base=4000; for($i=0;$i -lt 30;$i++){ $port=$base+$i; if(-not (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue)){ Write-Output $port; break } }"`) do set BACKEND_PORT=%%p
for /f "usebackq delims=" %%p in (`powershell -NoProfile -ExecutionPolicy Bypass -Command "$base=3000; for($i=0;$i -lt 30;$i++){ $port=$base+$i; if(-not (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue)){ Write-Output $port; break } }"`) do set FRONTEND_PORT=%%p

if "%BACKEND_PORT%"=="" set BACKEND_PORT=4000
if "%FRONTEND_PORT%"=="" set FRONTEND_PORT=3000

echo Backend  : http://localhost:%BACKEND_PORT%
echo Frontend : http://localhost:%FRONTEND_PORT%
echo.

REM Save chosen ports so stop_demo.bat can stop the right instances
echo FRONTEND_PORT=%FRONTEND_PORT%> .demo_ports.env
echo BACKEND_PORT=%BACKEND_PORT%>> .demo_ports.env

echo Building frontend for production...
call npm --prefix frontend run build
if errorlevel 1 (
  echo Frontend build failed. Aborting.
  exit /b 1
)

REM Start backend in its own terminal (set PORT for this process)
start "SCA Backend" cmd /k "set PORT=%BACKEND_PORT% && npm --prefix backend run start"

REM Start frontend (production) in its own terminal
start "SCA Frontend" cmd /k "npm --prefix frontend run start -- -p %FRONTEND_PORT%"

echo.
echo Done. Two terminals should have opened (Backend + Frontend).
echo Use stop_demo.bat to stop them.
