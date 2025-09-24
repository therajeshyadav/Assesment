// Sample assessment data for demonstration
// This represents the data.js/data.ts file mentioned in the requirements

export interface AssessmentData {
  session_id: string;
  accuracy: number;
  assessmentResultId: string;
  assessment_id: string;
  bodyCompositionData: Record<string, string>;
  exercises: Array<{
    id: number;
    name: string;
    assignReps: number;
    correctReps: number;
    totalReps: number;
    setList: Array<{
      time: number;
      correctReps: number;
      totalReps: number;
      additionalFields: Array<{
        fieldName: string;
        fieldValue: string;
      }>;
    }>;
    analysisList?: string[];
    analysisScore?: number;
    tipsList?: string[];
  }>;
  vitalsMap: {
    vitals: {
      heart_rate: number;
      bp_sys: number;
      bp_dia: number;
      oxy_sat_prcnt: number;
      resp_rate: number;
    };
    wellness_score: number;
    health_risk_score: number;
  };
  gender: string;
  height: number;
  weight: number;
  timestamp: number;
  reportLink?: string;
}

// Sample Dataset 1: Health & Fitness Assessment
export const healthFitnessAssessment: AssessmentData = {
  session_id: "session_001",
  accuracy: 80,
  assessmentResultId: "-OK76ANqAq9pvKSl3ZoN",
  assessment_id: "as_hr_02",
  bodyCompositionData: {
    AGR: "1.687",
    Age: "43",
    BFC: "29.754",
    BMI: "33.145",
    BMR: "2054.217",
    FM: "33.027",
    FMI: "9.862",
    HeightM: "184.091",
    LM: "77.973",
    LMI: "23.283",
    M_Age: "48",
    WHGR: "0.564",
    WHR: "0.926"
  },
  exercises: [
    {
      id: 73,
      name: "Frontal body view",
      assignReps: 1,
      correctReps: 1,
      totalReps: 1,
      analysisList: [
        "Shoulders slightly uneven, affecting posture balance.",
        "Head alignment slightly off-center.",
        "Feet aligned properly under shoulders.",
        "Arms hang naturally by the sides."
      ],
      analysisScore: 75,
      tipsList: [
        "Practice shoulder alignment exercises daily.",
        "Focus on maintaining head center alignment."
      ],
      setList: [
        {
          time: 10,
          correctReps: 1,
          totalReps: 1,
          additionalFields: [
            {
              fieldName: "accuracy",
              fieldValue: "0.0"
            }
          ]
        }
      ]
    },
    {
      id: 235,
      name: "Jog test",
      assignReps: 10,
      correctReps: 1,
      totalReps: 1,
      setList: [
        {
          time: 61,
          correctReps: 1,
          totalReps: 1,
          additionalFields: [
            {
              fieldName: "accuracy",
              fieldValue: "99.17062"
            }
          ]
        }
      ]
    },
    {
      id: 259,
      name: "Squat",
      assignReps: 45,
      correctReps: 42,
      totalReps: 42,
      setList: [
        {
          time: 90,
          correctReps: 42,
          totalReps: 42,
          additionalFields: [
            {
              fieldName: "accuracy",
              fieldValue: "93.333336"
            },
            {
              fieldName: "reps",
              fieldValue: "42"
            }
          ]
        }
      ]
    }
  ],
  vitalsMap: {
    vitals: {
      heart_rate: 75,
      bp_sys: 124,
      bp_dia: 82,
      oxy_sat_prcnt: 96,
      resp_rate: 21
    },
    wellness_score: 84,
    health_risk_score: 16
  },
  gender: "male",
  height: 183,
  weight: 111,
  timestamp: 1740671597044,
  reportLink: "https://storage.googleapis.com/allycare-prod.appspot.com/sample-report-1.pdf"
};

// Sample Dataset 2: Cardiac Assessment
export const cardiacAssessment: AssessmentData = {
  session_id: "session_002",
  accuracy: 17,
  assessmentResultId: "-OTafA4SqUgE6Y5xrqiI",
  assessment_id: "as_card_01",
  bodyCompositionData: {
    AGR: "0.90",
    BFC: "-0.90",
    BMI: "9.51",
    BMR: "995.39",
    FM: "-0.18",
    FMI: "-0.09",
    LM: "20.18",
    LMI: "9.60",
    M_Age: "15",
    WHGR: "0.37",
    WHR: "1.01"
  },
  exercises: [
    {
      id: 73,
      name: "Frontal body view",
      assignReps: 1,
      correctReps: 1,
      totalReps: 1,
      setList: [
        {
          time: 10,
          correctReps: 1,
          totalReps: 1,
          additionalFields: [
            {
              fieldName: "accuracy",
              fieldValue: "0"
            }
          ]
        }
      ]
    },
    {
      id: 235,
      name: "Jog test",
      assignReps: 10,
      correctReps: 0,
      totalReps: 0,
      setList: [
        {
          time: 47,
          correctReps: 0,
          totalReps: 0,
          additionalFields: [
            {
              fieldName: "accuracy",
              fieldValue: "15.164222764530614"
            }
          ]
        }
      ]
    }
  ],
  vitalsMap: {
    vitals: {
      heart_rate: 66,
      bp_sys: 110,
      bp_dia: 75,
      oxy_sat_prcnt: 95,
      resp_rate: 19
    },
    wellness_score: 84,
    health_risk_score: 16
  },
  gender: "male",
  height: 145,
  weight: 20,
  timestamp: 1750848025493,
  reportLink: "https://firebasestorage.googleapis.com/sample-cardiac-report.pdf"
};

// Registry of all sample data
export const assessmentDataRegistry = new Map<string, AssessmentData>([
  [healthFitnessAssessment.session_id, healthFitnessAssessment],
  [cardiacAssessment.session_id, cardiacAssessment]
]);

// Utility functions for data access
export const getAssessmentData = (sessionId: string): AssessmentData | undefined => {
  return assessmentDataRegistry.get(sessionId);
};

export const getAllAssessmentData = (): AssessmentData[] => {
  return Array.from(assessmentDataRegistry.values());
};

export const addAssessmentData = (data: AssessmentData): void => {
  assessmentDataRegistry.set(data.session_id, data);
};