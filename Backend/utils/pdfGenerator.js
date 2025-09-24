import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PDFGenerator {
  static async generatePDF(reportData, sessionId) {
    try {
      // Ensure reports directory exists
      const reportsDir = path.join(__dirname, '../reports');
      await fs.ensureDir(reportsDir);

      // Generate HTML content
      const htmlContent = this.generateHTML(reportData);
      
      // Launch puppeteer
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      
      // Set content and generate PDF
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      const pdfPath = path.join(reportsDir, `assessment_${sessionId}_${Date.now()}.pdf`);
      
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        }
      });
      
      await browser.close();
      
      return pdfPath;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  static generateHTML(reportData) {
    const { assessmentName, sections, metadata } = reportData;
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${assessmentName} Report</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background: #fff;
            }
            
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                margin-bottom: 30px;
            }
            
            .header h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
                font-weight: 300;
            }
            
            .header .subtitle {
                font-size: 1.2em;
                opacity: 0.9;
            }
            
            .metadata {
                background: #f8f9fa;
                padding: 20px;
                margin-bottom: 30px;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }
            
            .metadata-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .metadata-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .metadata-label {
                font-weight: 600;
                color: #555;
            }
            
            .metadata-value {
                font-weight: 500;
                color: #333;
            }
            
            .section {
                margin-bottom: 40px;
                break-inside: avoid;
            }
            
            .section-title {
                font-size: 1.8em;
                color: #333;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 3px solid #667eea;
                font-weight: 600;
            }
            
            .fields-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }
            
            .field-card {
                background: #fff;
                border: 1px solid #e1e5e9;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: transform 0.2s ease;
            }
            
            .field-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }
            
            .field-label {
                font-size: 0.9em;
                color: #666;
                margin-bottom: 8px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .field-value {
                font-size: 1.8em;
                font-weight: 700;
                color: #333;
                margin-bottom: 5px;
            }
            
            .field-unit {
                font-size: 0.9em;
                color: #888;
                font-weight: 400;
            }
            
            .classification {
                margin-top: 10px;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 0.85em;
                font-weight: 600;
                text-align: center;
                color: white;
            }
            
            .field-description {
                margin-top: 10px;
                font-size: 0.85em;
                color: #666;
                font-style: italic;
            }
            
            .footer {
                margin-top: 50px;
                padding: 20px;
                text-align: center;
                color: #666;
                border-top: 1px solid #e1e5e9;
                font-size: 0.9em;
            }
            
            @media print {
                .section {
                    page-break-inside: avoid;
                }
                
                .field-card {
                    break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${assessmentName}</h1>
            <div class="subtitle">Comprehensive Health Assessment Report</div>
        </div>
        
        <div class="metadata">
            <div class="metadata-grid">
                <div class="metadata-item">
                    <span class="metadata-label">Session ID:</span>
                    <span class="metadata-value">${metadata.sessionId}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Generated:</span>
                    <span class="metadata-value">${new Date().toLocaleDateString()}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Assessment ID:</span>
                    <span class="metadata-value">${metadata.assessmentId}</span>
                </div>
            </div>
        </div>
        
        ${sections.map(section => `
            <div class="section">
                <h2 class="section-title">${section.title}</h2>
                <div class="fields-grid">
                    ${section.fields.map(field => `
                        <div class="field-card">
                            <div class="field-label">${field.label}</div>
                            <div class="field-value">
                                ${field.value}
                                ${field.unit ? `<span class="field-unit">${field.unit}</span>` : ''}
                            </div>
                            ${field.classification ? `
                                <div class="classification" style="background-color: ${field.classification.color}">
                                    ${field.classification.label}
                                </div>
                            ` : ''}
                            ${field.description ? `
                                <div class="field-description">${field.description}</div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
        
        <div class="footer">
            <p>This report was generated automatically based on assessment data.</p>
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
    </body>
    </html>
    `;
  }
}