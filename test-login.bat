@echo off
echo 🧪 Testing Login Functionality...
echo.

echo 📊 Testing health endpoint...
curl -s http://localhost:5000/api/health
echo.
echo.

echo 🔐 Testing login with correct credentials...
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password\"}"
echo.
echo.

echo ✅ Test complete!
pause