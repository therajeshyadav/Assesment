// Configuration-driven assessment system
// This demonstrates how new assessment types can be added without code changes

export interface FieldMapping {
  jsonPath: string;
  displayName: string;
  unit?: string;
  format?: 'number' | 'percentage' | 'text' | 'date';
  classification?: {
    ranges: Array<{
      min?: number;
      max?: number;
      label: string;
      color: 'success' | 'warning' | 'destructive';
    }>;
  };
}

export interface SectionConfig {
  id: string;
  title: string;
  description?: string;
  fields: FieldMapping[];
  order: number;
}

export interface AssessmentTypeConfig {
  assessment_id: string;
  name: string;
  description: string;
  sections: SectionConfig[];
  template?: string; // HTML template path
}

// Configuration for Health & Fitness Assessment (as_hr_02)
export const healthFitnessConfig: AssessmentTypeConfig = {
  assessment_id: 'as_hr_02',
  name: 'Health & Fitness Assessment',
  description: 'Comprehensive health and fitness evaluation',
  sections: [
    {
      id: 'overall_score',
      title: 'Overall Health Score',
      fields: [
        {
          jsonPath: 'accuracy',
          displayName: 'Overall Score',
          unit: '%',
          format: 'percentage',
          classification: {
            ranges: [
              { min: 80, label: 'Excellent', color: 'success' },
              { min: 60, max: 79, label: 'Good', color: 'warning' },
              { max: 59, label: 'Needs Improvement', color: 'destructive' }
            ]
          }
        }
      ],
      order: 1
    },
    {
      id: 'key_vitals',
      title: 'Key Body Vitals',
      fields: [
        {
          jsonPath: 'vitalsMap.vitals.heart_rate',
          displayName: 'Heart Rate',
          unit: 'bpm',
          format: 'number'
        },
        {
          jsonPath: 'vitalsMap.vitals.bp_sys',
          displayName: 'Blood Pressure (Systolic)',
          unit: 'mmHg',
          format: 'number'
        },
        {
          jsonPath: 'vitalsMap.vitals.bp_dia',
          displayName: 'Blood Pressure (Diastolic)',
          unit: 'mmHg',
          format: 'number'
        }
      ],
      order: 2
    },
    {
      id: 'fitness_levels',
      title: 'Fitness Levels',
      fields: [
        {
          jsonPath: 'exercises[?(@.id==235)].setList[0].time',
          displayName: 'Cardiovascular Endurance',
          unit: 'seconds',
          format: 'number'
        },
        {
          jsonPath: 'exercises[?(@.id==259)].totalReps',
          displayName: 'Muscle Strength (Squats)',
          unit: 'reps',
          format: 'number'
        }
      ],
      order: 3
    },
    {
      id: 'body_composition',
      title: 'Body Composition',
      fields: [
        {
          jsonPath: 'bodyCompositionData.BMI',
          displayName: 'BMI',
          unit: 'kg/m²',
          format: 'number',
          classification: {
            ranges: [
              { max: 18.5, label: 'Underweight', color: 'warning' },
              { min: 18.5, max: 24.9, label: 'Normal', color: 'success' },
              { min: 25, max: 29.9, label: 'Overweight', color: 'warning' },
              { min: 30, label: 'Obese', color: 'destructive' }
            ]
          }
        },
        {
          jsonPath: 'bodyCompositionData.BFC',
          displayName: 'Body Fat %',
          unit: '%',
          format: 'number'
        }
      ],
      order: 4
    }
  ]
};

// Configuration for Cardiac Assessment (as_card_01)
export const cardiacConfig: AssessmentTypeConfig = {
  assessment_id: 'as_card_01',
  name: 'Cardiac Assessment',
  description: 'Specialized cardiac health evaluation',
  sections: [
    {
      id: 'overall_score',
      title: 'Overall Health Score',
      fields: [
        {
          jsonPath: 'accuracy',
          displayName: 'Overall Score',
          unit: '%',
          format: 'percentage'
        }
      ],
      order: 1
    },
    {
      id: 'key_vitals',
      title: 'Key Body Vitals',
      fields: [
        {
          jsonPath: 'vitalsMap.vitals.heart_rate',
          displayName: 'Heart Rate',
          unit: 'bpm',
          format: 'number'
        },
        {
          jsonPath: 'vitalsMap.vitals.bp_sys',
          displayName: 'Systolic BP',
          unit: 'mmHg',
          format: 'number'
        },
        {
          jsonPath: 'vitalsMap.vitals.bp_dia',
          displayName: 'Diastolic BP',
          unit: 'mmHg',
          format: 'number'
        }
      ],
      order: 2
    },
    {
      id: 'cardiovascular',
      title: 'Cardiovascular Endurance',
      fields: [
        {
          jsonPath: 'exercises[?(@.id==235)].setList[0].time',
          displayName: 'Jog Test Duration',
          unit: 'seconds',
          format: 'number'
        }
      ],
      order: 3
    },
    {
      id: 'body_composition',
      title: 'Body Composition',
      fields: [
        {
          jsonPath: 'bodyCompositionData.BMI',
          displayName: 'BMI',
          unit: 'kg/m²',
          format: 'number'
        }
      ],
      order: 4
    }
  ]
};

// Registry of all assessment configurations
export const assessmentConfigs = new Map<string, AssessmentTypeConfig>([
  [healthFitnessConfig.assessment_id, healthFitnessConfig],
  [cardiacConfig.assessment_id, cardiacConfig]
]);

// Utility functions for configuration management
export const getAssessmentConfig = (assessmentId: string): AssessmentTypeConfig | undefined => {
  return assessmentConfigs.get(assessmentId);
};

export const getAllAssessmentTypes = (): AssessmentTypeConfig[] => {
  return Array.from(assessmentConfigs.values());
};

export const addAssessmentConfig = (config: AssessmentTypeConfig): void => {
  assessmentConfigs.set(config.assessment_id, config);
};

// Example of how to add a new assessment type without code changes:
/*
const newPsychologicalAssessment: AssessmentTypeConfig = {
  assessment_id: 'as_psych_01',
  name: 'Psychological Assessment',
  description: 'Mental health and cognitive evaluation',
  sections: [
    {
      id: 'cognitive_score',
      title: 'Cognitive Performance',
      fields: [
        {
          jsonPath: 'cognitiveData.overallScore',
          displayName: 'Cognitive Score',
          unit: 'points',
          format: 'number'
        }
      ],
      order: 1
    }
  ]
};

// Simply add to registry - no code changes needed
addAssessmentConfig(newPsychologicalAssessment);
*/