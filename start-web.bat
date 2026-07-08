@echo off
echo ==========================================
echo       Starting Adapt Platform Web
echo ==========================================
echo.

cd /d "%~dp0"

echo Starting development server and opening browser...
npm run dev -- --open

pause
