import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SimplePDFGenerator {
  static async generateReport(reportData, sessionId) {
    try {
      // Ensure reports directory exists
      const reportsDir = path.join(__dirname, '../reports');
      await fs.ensureDir(reportsDir);

      // Generate HTML content
      const htmlContent = this.generateHTML(reportData);
      
      // For now, save as HTML file (can be converted to PDF later)
      const fileName = `assessment_${sessionId}_${Date.now()}.html`;
      const filePath = path.join(reportsDir, fileName);
      
      await fs.writeFile(filePath, htmlContent);
      
      return filePath;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

  static generateHTML(reportData) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Assessment Report - ${reportData.assessmentName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; }
        .field { margin: 8px 0; padding: 5px; background: #f5f5f5; }
        .field-label { font-weight: bold; }
        .metadata { margin-top: 30px; padding: 15px; background: #e9e9e9; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${reportData.assessmentName}</h1>
        <p>Generated on: ${new Date(reportData.metadata.generatedAt).toLocaleString()}</p>
        <p>Session ID: ${reportData.metadata.sessionId}</p>
    </div>

    ${reportData.sections.map(section => `
        <div class="section">
            <div class="section-title">${section.title}</div>
            ${section.fields.map(field => `
                <div class="field">
                    <span class="field-label">${field.label}:</span>
                    <span>${field.value} ${field.unit || ''}</span>
                </div>
            `).join('')}
        </div>
    `).join('')}

    <div class="metadata">
        <h3>Report Information</h3>
        <p><strong>Assessment ID:</strong> ${reportData.metadata.assessmentId}</p>
        <p><strong>Generated At:</strong> ${reportData.metadata.generatedAt}</p>
    </div>
</body>
</html>`;
  }
}