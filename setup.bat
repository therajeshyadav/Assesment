@echo off
echo 🚀 Setting up Assessment Management System...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

:: Install backend dependencies
echo 📦 Installing backend dependencies...
cd Backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

:: Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\Frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

:: Create reports directory
echo 📁 Creating reports directory...
cd ..\Backend
if not exist reports mkdir reports

echo ✅ Setup complete!
echo.
echo 🎯 To start the system:
echo 1. Start backend:  cd Backend ^&^& node server.js
echo 2. Start frontend: cd Frontend ^&^& npm run dev
echo.
echo 🌐 Access the application at:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.
echo 👤 Test credentials:
echo    Email: test@example.com
echo    Password: password
echo.
pause