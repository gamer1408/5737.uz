@echo off
echo Starting Auth Server...
start /min node auth-server.js
timeout /t 2 /nobreak > nul
echo Auth server started in background
echo.
echo Now run: npm run dev
pause