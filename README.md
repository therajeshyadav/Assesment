# Assessment Management System

A full-stack web application with user authentication and dynamic PDF report generation system. The system generates different types of reports from pre-existing assessment data without requiring code modifications for new assessment types.

## 🚀 Features

### ✅ User Authentication System
- User registration (signup) with proper validation
- User login with secure authentication
- JWT-based authentication
- Protected API endpoints
- Frontend forms for user registration and login

### ✅ PDF Report Generation System
- **Configuration-driven**: Add new assessment types without code changes
- **Dynamic data extraction**: JSON path mapping for flexible field access
- **Value classification**: Configurable ranges for field values
- **Template flexibility**: Support different assessment types
- **Professional PDF output**: Generated using Puppeteer with styled HTML templates

### ✅ Flexible Configuration System
- **Section Configuration**: Which sections to display per assessment_id
- **Field Mapping**: Dynamic JSON path mapping for each field
- **Value Classification**: Configurable ranges for field values
- **Template Flexibility**: Support different assessment types without code modification

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Authentication**: JWT-based with bcrypt password hashing
- **Data Storage**: File-based data storage (data.js)
- **PDF Generation**: Puppeteer for HTML to PDF conversion
- **Configuration System**: Flexible assessment configuration
- **API Endpoints**: RESTful API design

### Frontend (React + TypeScript + Tailwind CSS)
- **Authentication UI**: Login/signup forms with validation
- **Dashboard**: Real-time data from backend
- **Report Generation**: Interface to test report generation
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
Assessment-Management-System/
├── Backend/
│   ├── config/
│   │   └── assessmentConfig.js     # Assessment configurations
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── utils/
│   │   ├── dataExtractor.js        # Dynamic data extraction utility
│   │   └── pdfGenerator.js         # PDF generation with Puppeteer
│   ├── reports/                    # Generated PDF reports directory
│   ├── data.js                     # Sample assessment data
│   ├── server.js                   # Main server file
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/               # Authentication components
│   │   │   └── dashboard/          # Dashboard components
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx     # Authentication context
│   │   └── ...
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Backend Setup

1. **Navigate to Backend directory:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npx pnpm install
   # or
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npx pnpm install
   # or
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:8080`

## 🔧 Configuration System

### Adding New Assessment Types

The system is designed to handle new assessment types through configuration only. Here's how:

#### 1. Assessment Configuration (`Backend/config/assessmentConfig.js`)

```javascript
export const assessmentConfigs = {
  "new_assessment_id": {
    name: "New Assessment Type",
    sections: [
      {
        id: "overview",
        title: "Assessment Overview",
        fields: [
          {
            label: "Overall Score",
            path: "accuracy",
            unit: "%",
            classification: {
              ranges: [
                { min: 0, max: 40, label: "Poor", color: "#ef4444" },
                { min: 41, max: 60, label: "Fair", color: "#f97316" },
                { min: 61, max: 80, label: "Good", color: "#eab308" },
                { min: 81, max: 100, label: "Excellent", color: "#22c55e" }
              ]
            }
          }
        ]
      }
    ]
  }
};
```

#### 2. Dynamic Field Mapping Examples

- **Simple field**: `"accuracy"` → Gets top-level accuracy field
- **Nested field**: `"vitalsMap.vitals.heart_rate"` → Gets nested heart rate
- **Array with condition**: `"exercises[id=235].setList[0].time"` → Gets time from specific exercise
- **Array with index**: `"exercises[0].name"` → Gets first exercise name

#### 3. Value Classification

Configure ranges for automatic value classification:

```javascript
classification: {
  ranges: [
    { min: 0, max: 18.5, label: "Underweight", color: "#3b82f6" },
    { min: 18.5, max: 24.9, label: "Normal", color: "#22c55e" },
    { min: 25, max: 29.9, label: "Overweight", color: "#eab308" },
    { min: 30, max: 50, label: "Obese", color: "#ef4444" }
  ]
}
```

## 📊 Sample Data

The system includes two sample assessment types:

### 1. Health & Fitness Assessment (`as_hr_02`)
- **Session ID**: `session_001`
- **Sections**: Overview, Key Body Vitals, Heart Health, Fitness Levels, Posture, Body Composition
- **Sample Score**: 80%

### 2. Cardiac Assessment (`as_card_01`)
- **Session ID**: `session_002`
- **Sections**: Overview, Key Body Vitals, Cardiovascular Endurance, Body Composition
- **Sample Score**: 17%

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Assessments
- `GET /api/assessments` - Get all assessments (protected)
- `GET /api/assessments/:sessionId` - Get specific assessment (protected)

### Report Generation
- `POST /api/generate-report` - Generate PDF report (protected)
  ```json
  {
    "session_id": "session_001"
  }
  ```

### Configuration
- `GET /api/config/assessments` - Get assessment configurations (protected)

### Health Check
- `GET /api/health` - System health status

## 🎯 Testing the System

### 1. User Registration/Login
1. Open `http://localhost:8080`
2. Create a new account or login
3. Access the dashboard

### 2. Generate Reports
1. Navigate to "Reports" section
2. Enter a session ID: `session_001` or `session_002`
3. Click "Generate PDF Report"
4. PDF will be automatically downloaded

### 3. View Available Assessments
1. Check the "Available Assessments" section
2. Click on any assessment to select it
3. Generate report for selected assessment

## 🎨 Key Features Demonstration

### Configuration Flexibility
- **No Code Changes**: Add new assessment types by modifying configuration only
- **Dynamic Field Mapping**: Extract any field from complex JSON structures
- **Flexible Sections**: Configure which sections appear for each assessment type
- **Value Classification**: Automatic categorization based on configurable ranges

### Professional PDF Reports
- **Styled HTML Templates**: Professional-looking reports
- **Dynamic Content**: Content changes based on assessment type
- **Color-coded Classifications**: Visual indicators for health metrics
- **Responsive Design**: Looks good in print and digital formats

### Real-time Dashboard
- **Live Data**: Dashboard shows real assessment data from backend
- **Interactive UI**: Modern, responsive interface
- **Authentication**: Secure access with JWT tokens
- **Error Handling**: Graceful error handling and user feedback

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: All sensitive endpoints require authentication
- **Input Validation**: Proper validation on both frontend and backend
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🚀 Production Deployment

### Environment Variables
Create a `.env` file in the Backend directory:

```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
NODE_ENV=production
```

### Build Commands
```bash
# Frontend build
cd Frontend
npm run build

# Backend production
cd Backend
npm start
```

## 📈 Future Enhancements

- **Database Integration**: Replace file-based storage with proper database
- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Analytics**: More detailed reporting and analytics
- **Email Integration**: Send reports via email
- **Multi-language Support**: Internationalization
- **Advanced User Management**: Roles and permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Node.js, React, TypeScript, and Tailwind CSS**