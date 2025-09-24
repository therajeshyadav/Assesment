#!/bin/bash

echo "🚀 Setting up Assessment Management System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd Backend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "✅ Backend dependencies installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../Frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "✅ Frontend dependencies installed"

# Create reports directory
echo "📁 Creating reports directory..."
cd ../Backend
mkdir -p reports

echo "✅ Setup complete!"
echo ""
echo "🎯 To start the system:"
echo "1. Start backend:  cd Backend && node server.js"
echo "2. Start frontend: cd Frontend && npm run dev"
echo ""
echo "🌐 Access the application at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""
echo "👤 Test credentials:"
echo "   Email: test@example.com"
echo "   Password: password"