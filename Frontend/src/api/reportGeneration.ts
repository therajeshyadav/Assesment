// API integration points for report generation
// This demonstrates how the frontend will connect to the backend API

export interface ReportGenerationRequest {
  sessionId: string;
  assessmentType?: string;
  customConfig?: any;
}

export interface ReportGenerationResponse {
  success: boolean;
  message: string;
  reportPath?: string;
  error?: string;
}

// Mock API functions - these will be replaced with actual backend calls
export const reportGenerationAPI = {
  // Generate PDF report from session data
  async generateReport(request: ReportGenerationRequest): Promise<ReportGenerationResponse> {
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Report generation failed:', error);
      return {
        success: false,
        message: 'Failed to generate report',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Get available sessions for report generation
  async getAvailableSessions(): Promise<string[]> {
    try {
      const response = await fetch('/api/sessions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.sessions || [];
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      return [];
    }
  },

  // Get assessment configuration
  async getAssessmentConfig(assessmentId: string) {
    try {
      const response = await fetch(`/api/config/${assessmentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch assessment config:', error);
      return null;
    }
  }
};

// Authentication API functions
export const authAPI = {
  async login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
  },

  async signup(name: string, email: string, password: string) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
  },

  logout() {
    localStorage.removeItem('token');
  }
};