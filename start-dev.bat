@echo off
echo Starting 5737.uz Development Environment...
echo.

echo Starting Authentication Server...
start "Auth Server" cmd /k "node auth-server.js"

timeout /t 3 /nobreak > nul

echo Starting Frontend Development Server...
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Auth Server: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
pause