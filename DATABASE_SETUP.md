# 🗄️ Database Setup - User Authentication Only

## 📋 What's Changed

✅ **User Authentication**: Now uses MongoDB for persistent user accounts
✅ **Assessment Data**: Still in-memory (no database needed)
✅ **Hybrid Approach**: Best of both worlds - persistent users, simple deployment

## 🔧 Implementation Details

### **Users (MongoDB)**
- Signup/Login data stored in MongoDB
- Persistent across server restarts
- Proper password hashing
- JWT authentication

### **Assessment Data (In-Memory)**
- Assessment results remain in `data.js`
- No database complexity for demo data
- Fast and simple for portfolio projects

## 🚀 Quick Setup

### Local Development:
```bash
# Run the setup script
setup-db.bat

# Or manually:
cd Backend
npm install
npm run seed:users
npm start
```

### Production Deployment:
1. **Get MongoDB URI** (MongoDB Atlas free tier)
2. **Set Environment Variables**:
   - `MONGODB_URI=your-connection-string`
   - `JWT_SECRET=your-secret-key`
3. **Deploy as usual**
4. **Seed test user**: Run `npm run seed:users` once

## 🧪 Test Credentials

**Default Test User:**
- Email: `test@example.com`
- Password: `password`

## 📊 Data Flow

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend    │    │   Data Storage  │
├─────────────────┤    ├──────────────┤    ├─────────────────┤
│ • Login Form    │───▶│ • Auth API   │───▶│ • Users (MongoDB)│
│ • Signup Form   │    │ • JWT Tokens │    │ • Assessments   │
│ • Dashboard     │    │ • Reports    │    │   (In-Memory)   │
└─────────────────┘    └──────────────┘    └─────────────────┘
```

## 🔍 Benefits

### **For Users:**
- ✅ Persistent accounts
- ✅ Secure authentication
- ✅ No data loss on restart

### **For Deployment:**
- ✅ Simple setup (only user DB)
- ✅ Fast assessment queries
- ✅ Minimal database costs
- ✅ Easy to maintain

## 🛠️ Environment Variables

### Development (.env):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-development-secret
PORT=5000
NODE_ENV=development
```

### Production:
```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-super-secure-production-secret
NODE_ENV=production
PORT=5000
```

## 🔧 Troubleshooting

### **Connection Issues:**
1. Check MongoDB URI format
2. Verify network access in MongoDB Atlas
3. Ensure environment variables are set

### **Authentication Issues:**
1. Run `npm run seed:users` to create test user
2. Check JWT_SECRET is consistent
3. Verify token expiration settings

### **Deployment Issues:**
1. Ensure all environment variables are set
2. Check MongoDB Atlas IP whitelist
3. Verify database connection in logs

## 📝 Next Steps

1. **Deploy Backend** with MongoDB URI
2. **Deploy Frontend** with API URLs
3. **Test Authentication** with test user
4. **Create Real Users** via signup form

Your app now has persistent user authentication while keeping the simplicity of in-memory assessment data! 🎉