@echo off
echo 🚀 Starting Assessment Management System Backend...
echo.

cd Backend

echo 📦 Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

echo 📁 Creating reports directory...
if not exist reports mkdir reports

echo 🌐 Starting server on http://localhost:5000...
echo.
echo ✅ Backend is ready! You can now:
echo    - Access API at: http://localhost:5000
echo    - Test health check: http://localhost:5000/api/health
echo    - Start frontend in another terminal
echo.
echo 🛑 Press Ctrl+C to stop the server
echo.

node server.js