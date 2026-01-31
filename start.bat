@echo off
echo.
echo ========================================
echo    Starting AnswerGit Services
echo ========================================
echo.

REM Start GitIngest API
echo [1/2] Starting GitIngest API...
start "GitIngest API" cmd /k "cd gitingest-api && python main.py"
timeout /t 3 /nobreak >nul
echo      Done!
echo.

REM Start Next.js
echo [2/2] Starting Next.js...
echo.
call pnpm dev
