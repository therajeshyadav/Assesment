# Quick Start Guide

## 🚀 Starting the Application

### Option 1: Start Both Services Together
```bash
start-both.bat
```

### Option 2: Start Services Separately
1. **Backend**: `start-backend.bat`
2. **Frontend**: `cd Frontend && npm run dev`

## 🌐 Access Points
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 👤 Test Credentials
- **Email**: test@example.com
- **Password**: password

## 🧪 Testing
- **Test Login**: `test-login.bat`
- **Test Backend**: `test-backend.bat`

## ✅ Fixed Issues
1. ✅ React Router warnings resolved
2. ✅ Authentication fixed (correct password hash)
3. ✅ Report generation error handling improved
4. ✅ Backend startup scripts created

## 🔧 Troubleshooting
If you get 404 errors:
1. Make sure backend is running on port 5000
2. Check `http://localhost:5000/api/health`
3. Restart backend with `start-backend.bat`

If login fails:
1. Use exact credentials: test@example.com / password
2. Check browser console for errors
3. Test with `test-login.bat`