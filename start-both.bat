@echo off
echo 🚀 Starting Assessment Management System (Frontend + Backend)...
echo.

:: Start backend in a new window
echo 🔧 Starting backend server...
start "Backend Server" cmd /k "cd Backend && echo Starting backend on http://localhost:5000... && node server.js"

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

:: Start frontend in a new window
echo 🎨 Starting frontend development server...
start "Frontend Dev Server" cmd /k "cd Frontend && echo Starting frontend on http://localhost:5173... && npm run dev"

echo.
echo ✅ Both services are starting!
echo.
echo 🌐 Access points:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.
echo 👤 Test credentials:
echo    Email: test@example.com
echo    Password: password
echo.
echo 🛑 Close both terminal windows to stop the services
echo.
pause