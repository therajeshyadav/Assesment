@echo off
echo 🗄️ Setting up database for user authentication...
echo.

cd Backend

echo 📦 Installing dependencies...
call npm install

echo.
echo 🌱 Seeding test user...
call npm run seed:users

echo.
echo ✅ Database setup complete!
echo.
echo 👤 Test user created:
echo    Email: test@example.com
echo    Password: password
echo.
pause