import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { assessmentData } from './data.js'; // Keep assessment data in-memory
import { assessmentConfigs } from './config/assessmentConfig.js';
import { DataExtractor } from './utils/dataExtractor.js';
import { PDFGenerator } from './utils/pdfGenerator.js';
import { SimplePDFGenerator } from './utils/simplePdfGenerator.js';
import { connectDatabase } from './config/database.js';
import { User } from './models/User.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database connection
connectDatabase();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
};

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from reports directory
app.use('/reports', express.static(path.join(__dirname, 'reports')));
app.use('/api/reports', express.static(path.join(__dirname, 'reports')));
app.use('/api/static/reports', express.static(path.join(__dirname, 'reports')));

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists in MongoDB
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in MongoDB
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate token
    const token = generateToken({
      id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'User already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken({
      id: user._id.toString(),
      username: user.username,
      email: user.email
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected Routes
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Assessment Routes
app.get('/api/assessments', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, assessment_id, status } = req.query;
    
    // Filter assessments
    let filteredAssessments = assessmentData;
    
    if (assessment_id) {
      filteredAssessments = filteredAssessments.filter(a => a.assessment_id === assessment_id);
    }
    
    if (status) {
      filteredAssessments = filteredAssessments.filter(a => a.status === status);
    }

    // Sort by timestamp (newest first)
    filteredAssessments.sort((a, b) => b.timestamp - a.timestamp);

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedAssessments = filteredAssessments.slice(startIndex, endIndex);

    res.json({ 
      assessments: paginatedAssessments,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(filteredAssessments.length / limit),
        total: filteredAssessments.length
      }
    });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/assessments/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const assessment = assessmentData.find(a => a.session_id === sessionId);

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    res.json({ assessment });
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Report Generation Route - Support both GET and POST
const generateReportHandler = async (req, res) => {
  try {
    const session_id = req.method === 'POST' ? req.body.session_id : req.query.session_id;

    if (!session_id) {
      return res.status(400).json({ error: 'session_id is required' });
    }

    // Find assessment data from data.js
    const assessmentRecord = assessmentData.find(a => a.session_id === session_id);
    if (!assessmentRecord) {
      return res.status(404).json({ error: 'Assessment data not found' });
    }

    // Get configuration for this assessment type
    const config = assessmentConfigs[assessmentRecord.assessment_id];
    if (!config) {
      return res.status(400).json({ error: 'Assessment configuration not found' });
    }

    // Process data according to configuration (simplified)
    const processedSections = config.sections.map(section => ({
      id: section.id,
      title: section.title,
      fields: section.fields.map(field => {
        try {
          return DataExtractor.processField(assessmentRecord, field);
        } catch (error) {
          console.error(`Error processing field ${field.id}:`, error);
          return {
            id: field.id,
            label: field.label,
            value: 'N/A',
            unit: field.unit || '',
            error: 'Processing failed'
          };
        }
      })
    }));

    // Prepare report data
    const reportData = {
      assessmentName: config.name,
      sections: processedSections,
      metadata: {
        sessionId: session_id,
        assessmentId: assessmentRecord.assessment_id,
        generatedAt: new Date().toISOString()
      }
    };

    // Generate PDF (with error handling)
    let pdfPath, fileName;
    try {
      pdfPath = await PDFGenerator.generatePDF(reportData, session_id);
      fileName = path.basename(pdfPath);
      console.log('✅ PDF generated successfully:', fileName);
    } catch (pdfError) {
      console.error('PDF generation failed, using simple HTML report:', pdfError.message);
      try {
        // Fallback to simple HTML report
        pdfPath = await SimplePDFGenerator.generateReport(reportData, session_id);
        fileName = path.basename(pdfPath);
        console.log('✅ HTML report generated:', fileName);
      } catch (htmlError) {
        console.error('HTML generation also failed, creating JSON report:', htmlError);
        // Final fallback to JSON
        const reportsDir = path.join(path.dirname(new URL(import.meta.url).pathname), 'reports');
        fileName = `assessment_${session_id}_${Date.now()}.json`;
        pdfPath = path.join(reportsDir, fileName);
        
        const fs = await import('fs');
        if (!fs.existsSync(reportsDir)) {
          fs.mkdirSync(reportsDir, { recursive: true });
        }
        fs.writeFileSync(pdfPath, JSON.stringify(reportData, null, 2));
      }
    }

    // Store report info in memory (for demo purposes)
    const reportInfo = {
      id: Date.now().toString(),
      sessionId: session_id,
      assessmentId: assessmentRecord.assessment_id,
      fileName: fileName,
      filePath: pdfPath,
      reportType: assessmentRecord.assessment_id,
      generatedBy: req.user.id,
      status: 'completed',
      createdAt: new Date().toISOString(),
      metadata: {
        sections: reportData.sections.length,
        fields: reportData.sections.reduce((total, section) => total + section.fields.length, 0),
        configVersion: '1.0'
      }
    };

    // Update assessment record
    assessmentRecord.reportGenerated = true;
    assessmentRecord.reportPath = `/reports/${fileName}`;

    res.json({
      message: 'Report generated successfully',
      reportPath: `/reports/${fileName}`,
      fileName: fileName,
      sessionId: session_id,
      reportId: reportInfo.id,
      status: 'success',
      reportData: reportData // Include data for frontend display
    });

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ 
      error: 'Failed to generate report',
      details: error.message 
    });
  }
};

app.post('/api/generate-report', authenticateToken, generateReportHandler);
app.get('/api/generate-report', authenticateToken, generateReportHandler);

// Configuration Routes (for demonstrating flexibility)
app.get('/api/config/assessments', authenticateToken, (req, res) => {
  try {
    // Return available assessment configurations
    const configs = Object.keys(assessmentConfigs).map(key => ({
      assessment_id: key,
      name: assessmentConfigs[key].name,
      sections: assessmentConfigs[key].sections.map(s => ({
        id: s.id,
        title: s.title,
        fieldCount: s.fields.length
      }))
    }));

    res.json({ configurations: configs });
  } catch (error) {
    console.error('Error fetching configurations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Dashboard Statistics
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTimestamp = tomorrow.getTime();

    // Calculate statistics from data.js
    const totalAssessments = assessmentData.length;
    
    const todayAssessments = assessmentData.filter(a => 
      a.timestamp >= todayTimestamp && a.timestamp < tomorrowTimestamp
    ).length;
    
    const totalUsers = users.length;
    
    // Count reports generated (assessments with reportGenerated flag)
    const totalReports = assessmentData.filter(a => a.reportGenerated).length;
    
    // Group assessments by type
    const assessmentsByType = assessmentData.reduce((acc, assessment) => {
      const existing = acc.find(item => item._id === assessment.assessment_id);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ _id: assessment.assessment_id, count: 1 });
      }
      return acc;
    }, []);
    
    // Get recent assessments
    const recentAssessments = assessmentData
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
    
    // Calculate average score
    const totalScore = assessmentData.reduce((sum, a) => sum + a.accuracy, 0);
    const averageScore = assessmentData.length > 0 ? Math.round(totalScore / assessmentData.length) : 0;

    res.json({
      totalAssessments,
      todayAssessments,
      totalUsers,
      totalReports,
      averageScore,
      assessmentsByType,
      recentAssessments
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Download report endpoint
// Download report endpoint (with auth)
app.get('/api/download-report/:filename', authenticateToken, (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'reports', filename);
    
    console.log('Download request for:', filename);
    console.log('File path:', filePath);
    console.log('File exists:', fs.existsSync(filePath));
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      return res.status(404).json({ error: 'Report not found' });
    }

    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Send file
    res.sendFile(filePath);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download report' });
  }
});

// Simple download endpoint
app.get('/api/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'reports', filename);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Simple view endpoint  
app.get('/api/view/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'reports', filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'File-based (data.js)',
      counts: {
        assessments: assessmentData.length,
        users: users.length,
        reports: assessmentData.filter(a => a.reportGenerated).length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      database: 'File-based (data.js)',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⚙️  Assessment configurations: ${Object.keys(assessmentConfigs).length}`);
  console.log(`📊 Data loaded - Users: ${users.length}, Assessments: ${assessmentData.length}`);
  console.log(`📁 Using file-based data storage (data.js)`);
});