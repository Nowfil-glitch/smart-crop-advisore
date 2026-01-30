@echo off
setlocal EnableExtensions EnableDelayedExpansion

echo Stopping Smart Crop Advisor demo processes...
echo.

set FRONTEND_PORT=3000
set BACKEND_PORT=4000

REM If start_demo.bat saved ports, load them.
if exist .demo_ports.env (
  for /f "usebackq tokens=1,2 delims==" %%A in (".demo_ports.env") do (
    if /I "%%A"=="FRONTEND_PORT" set FRONTEND_PORT=%%B
    if /I "%%A"=="BACKEND_PORT" set BACKEND_PORT=%%B
  )
)

echo Using ports: Frontend=%FRONTEND_PORT% Backend=%BACKEND_PORT%
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$ports=@(%FRONTEND_PORT%,%BACKEND_PORT%); $pids=@(); foreach($port in $ports){ try { $conns=Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue; if($conns){ $pids += $conns.OwningProcess } } catch {} }; $pids = $pids | Where-Object { $_ -and $_ -ne 0 } | Select-Object -Unique; if(-not $pids -or $pids.Count -eq 0){ Write-Host ('No processes found on ports ' + ($ports -join ',')); exit 0 }; foreach($pid in $pids){ try { Stop-Process -Id $pid -Force -ErrorAction Stop; Write-Host ('Stopped PID ' + $pid) } catch { Write-Host ('Failed to stop PID ' + $pid + ': ' + $_.Exception.Message) } }"

REM Clean up saved ports file
if exist .demo_ports.env del .demo_ports.env

echo.
echo Done.
