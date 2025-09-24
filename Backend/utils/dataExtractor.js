// Dynamic data extraction utility
export class DataExtractor {
  static extractValue(data, path) {
    try {
      // Handle array notation like exercises[id=235]
      if (path.includes('[') && path.includes(']')) {
        return this.extractFromArray(data, path);
      }
      
      // Handle dot notation
      return path.split('.').reduce((obj, key) => {
        return obj && obj[key] !== undefined ? obj[key] : null;
      }, data);
    } catch (error) {
      console.error(`Error extracting value for path: ${path}`, error);
      return null;
    }
  }

  static extractFromArray(data, path) {
    // Parse path like "exercises[id=235].setList[0].time"
    const parts = path.split('.');
    let current = data;

    for (const part of parts) {
      if (part.includes('[') && part.includes(']')) {
        const [arrayName, condition] = part.split('[');
        const conditionClean = condition.replace(']', '');
        
        if (arrayName && current[arrayName]) {
          if (conditionClean.includes('=')) {
            // Handle condition like "id=235"
            const [key, value] = conditionClean.split('=');
            current = current[arrayName].find(item => 
              item[key] == value || item[key] === value
            );
          } else {
            // Handle index like "[0]"
            const index = parseInt(conditionClean);
            current = current[arrayName][index];
          }
        } else {
          return null;
        }
      } else {
        current = current && current[part] !== undefined ? current[part] : null;
      }
      
      if (current === null || current === undefined) {
        return null;
      }
    }

    return current;
  }

  static transformValue(value, transform) {
    if (!value || !transform) return value;

    switch (transform) {
      case 'capitalize':
        return typeof value === 'string' ? 
          value.charAt(0).toUpperCase() + value.slice(1) : value;
      
      case 'assessmentName':
        const assessmentNames = {
          'as_hr_02': 'Health & Fitness Assessment',
          'as_card_01': 'Cardiac Assessment'
        };
        return assessmentNames[value] || value;
      
      default:
        return value;
    }
  }

  static classifyValue(value, classification) {
    if (!classification || !classification.ranges) return null;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    for (const range of classification.ranges) {
      if (numValue >= range.min && numValue <= range.max) {
        return {
          label: range.label,
          color: range.color,
          value: numValue
        };
      }
    }

    return null;
  }

  static processField(data, field) {
    let value = this.extractValue(data, field.path);
    
    if (value !== null && value !== undefined) {
      // Apply transformation if specified
      if (field.transform) {
        value = this.transformValue(value, field.transform);
      }
      
      // Apply classification if specified
      let classification = null;
      if (field.classification) {
        classification = this.classifyValue(value, field.classification);
      }
      
      return {
        label: field.label,
        value: value,
        unit: field.unit || '',
        classification: classification,
        description: field.description || null
      };
    }
    
    return {
      label: field.label,
      value: 'N/A',
      unit: field.unit || '',
      classification: null,
      description: field.description || null
    };
  }
}