# 🚀 Deployment Guide

## 📋 Pre-Deployment Checklist

✅ **Environment Variables Updated**: All hardcoded localhost URLs have been replaced with environment variables
✅ **Health Check Endpoint**: Backend has `/api/health` endpoint for deployment monitoring
✅ **Configuration Files**: Railway, Vercel, and Netlify config files created

## 🎯 Recommended: Free Deployment Options

### Option 1: Vercel + Railway (Easiest)

#### Frontend (Vercel):
```bash
# 1. Build frontend
cd Frontend
npm install
npm run build

# 2. Deploy to Vercel
npx vercel --prod
# Follow prompts, connect GitHub repo
```

**Environment Variables in Vercel:**
- `VITE_API_URL`: `https://your-railway-app.railway.app/api`
- `VITE_API_BASE_URL`: `https://your-railway-app.railway.app`

#### Backend (Railway):
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login and deploy
npx @railway/cli login
npx @railway/cli deploy

# Select Backend folder when prompted
```

**Environment Variables in Railway:**
- `JWT_SECRET`: Generate a secure random string
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB connection string (see Database Setup below)

### Option 2: Netlify + Render

#### Frontend (Netlify):
```bash
# 1. Build
cd Frontend
npm install
npm run build

# 2. Drag & drop dist/ folder to netlify.com
```

**Or connect GitHub repo:**
- Build command: `npm run build`
- Publish directory: `dist`

#### Backend (Render):
- Connect GitHub repo
- Select Backend folder
- Build command: `npm install`
- Start command: `npm start`

## 🗄️ Database Setup (Required for User Authentication)

### Option 1: MongoDB Atlas (Recommended - Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string
4. Add to environment variables as `MONGODB_URI`

### Option 2: Railway MongoDB (if using Railway)
1. Add MongoDB service in Railway
2. Copy connection string from Railway dashboard
3. Add as `MONGODB_URI` environment variable

### Seed Test User (After Deployment)
```bash
# Run this once after deployment to create test user
npm run seed:users
```

**Test User Credentials:**
- Email: `test@example.com`
- Password: `password`

## ⚙️ Manual Deployment Steps

### 1. Update Environment Variables

**For Production Frontend (.env.production):**
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_API_BASE_URL=https://your-backend-url.com
```

### 2. Backend Environment Variables

Set these in your hosting platform:
```env
JWT_SECRET=your-super-secure-jwt-secret-key-here
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-connection-string
```

### 3. Build Commands

**Frontend:**
```bash
cd Frontend
npm install
npm run build
```

**Backend:**
```bash
cd Backend
npm install
npm start
```

## 🔧 Platform-Specific Instructions

### Vercel Deployment
1. Connect your GitHub repository
2. Set root directory to `Frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables in Vercel dashboard

### Railway Deployment
1. Connect GitHub repository
2. Select `Backend` folder as root
3. Railway will auto-detect Node.js and use `npm start`
4. Add environment variables in Railway dashboard

### Netlify Deployment
1. Drag and drop `Frontend/dist` folder after building
2. Or connect GitHub repo with build settings:
   - Base directory: `Frontend`
   - Build command: `npm run build`
   - Publish directory: `Frontend/dist`

### Render Deployment
1. Connect GitHub repository
2. Select `Backend` folder
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables in Render dashboard

## 🧪 Testing Deployment

After deployment, test these endpoints:

**Backend Health Check:**
```
GET https://your-backend-url.com/api/health
```

**Frontend:**
- Visit your frontend URL
- Test login functionality
- Test report generation
- Verify API calls work

## 🔍 Troubleshooting

**Common Issues:**

1. **CORS Errors**: Ensure backend CORS is configured for your frontend domain
2. **Environment Variables**: Double-check all URLs are updated
3. **Build Failures**: Ensure all dependencies are in package.json
4. **API Calls Failing**: Verify environment variables are set correctly

**Debug Steps:**
1. Check browser console for errors
2. Verify network requests are going to correct URLs
3. Check backend logs for errors
4. Test health endpoint directly

## 📝 Post-Deployment

1. Update README.md with live URLs
2. Test all functionality end-to-end
3. Monitor logs for any issues
4. Set up monitoring/alerts if needed

## 🔐 Security Notes

- Never commit `.env` files with real secrets
- Use strong JWT secrets in production
- Enable HTTPS on both frontend and backend
- Consider rate limiting for production APIs