@echo off
echo 🧪 Testing Backend Connection...
echo.

:: Test if backend is running
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is running and responding
    echo 📊 Health check response:
    curl -s http://localhost:5000/api/health
) else (
    echo ❌ Backend is not responding on http://localhost:5000
    echo.
    echo 🔧 To start the backend:
    echo    1. Run: start-backend.bat
    echo    2. Or manually: cd Backend ^&^& node server.js
)

echo.
pause