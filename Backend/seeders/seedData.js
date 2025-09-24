import { connectDatabase } from '../config/database.js';
import { User } from '../models/User.js';
import { Assessment } from '../models/Assessment.js';
import bcrypt from 'bcryptjs';

const sampleUsers = [
  {
    username: 'admin',
    email: 'admin@assessment.com',
    password: 'admin123',
    role: 'admin',
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      organization: 'Assessment Management System',
      department: 'Administration'
    }
  },
  {
    username: 'doctor_smith',
    email: 'doctor.smith@hospital.com',
    password: 'doctor123',
    role: 'healthcare_professional',
    profile: {
      firstName: 'John',
      lastName: 'Smith',
      organization: 'City General Hospital',
      department: 'Cardiology'
    }
  },
  {
    username: 'nurse_johnson',
    email: 'nurse.johnson@clinic.com',
    password: 'nurse123',
    role: 'healthcare_professional',
    profile: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      organization: 'Health Clinic',
      department: 'General Medicine'
    }
  }
];

const sampleAssessments = [
  {
    "session_id": "session_001",
    "accuracy": 80,
    "assessmentResultId": "-OK76ANqAq9pvKSl3ZoN",
    "assessment_id": "as_hr_02",
    "bodyCompositionData": {
      "AGR": "1.687",
      "Age": "43",
      "BFC": "29.754",
      "BMI": "33.145",
      "BMR": "2054.217",
      "FM": "33.027",
      "FMI": "9.862",
      "HeightM": "184.091",
      "LM": "77.973",
      "LMI": "23.283",
      "M_Age": "48",
      "WHGR": "0.564",
      "WHR": "0.926"
    },
    "exercises": [
      {
        "analysisList": [
          "Shoulders slightly uneven, affecting posture balance.",
          "Head alignment slightly off-center.",
          "Feet aligned properly under shoulders.",
          "Arms hang naturally by the sides."
        ],
        "analysisScore": 75,
        "assignReps": 1,
        "correctReps": 1,
        "id": 73,
        "name": "Frontal body view",
        "setList": [
          {
            "additionalFields": [
              {
                "fieldName": "accuracy",
                "fieldText": "Score",
                "fieldUnit": "%",
                "fieldValue": "0.0",
                "shouldDisplay": false
              }
            ],
            "correctReps": 1,
            "incorrectReps": 0,
            "isSkipped": false,
            "time": 10,
            "totalReps": 1
          }
        ],
        "side": "left",
        "tipsList": [
          "Practice shoulder alignment exercises daily.",
          "Focus on maintaining head center alignment."
        ],
        "totalReps": 1,
        "totalSets": 1,
        "variationId": "",
        "variationName": ""
      },
      {
        "analysisList": [
          "Head leans slightly forward.",
          "Spine shows slight curvature at neck.",
          "Hips aligned over ankles correctly.",
          "Knees are slightly bent, affecting stance."
        ],
        "analysisScore": 70,
        "assignReps": 1,
        "correctReps": 1,
        "id": 74,
        "name": "Side body view",
        "setList": [
          {
            "additionalFields": [
              {
                "fieldName": "accuracy",
                "fieldText": "Score",
                "fieldUnit": "%",
                "fieldValue": "0.0",
                "shouldDisplay": false
              }
            ],
            "correctReps": 1,
            "incorrectReps": 0,
            "isSkipped": false,
            "time": 22,
            "totalReps": 1
          }
        ],
        "side": "left",
        "tipsList": [
          "Engage in neck strengthening exercises.",
          "Consciously practice standing with straight knees."
        ],
        "totalReps": 1,
        "totalSets": 1,
        "variationId": "",
        "variationName": ""
      },
      {
        "assignReps": 10,
        "correctReps": 1,
        "id": 235,
        "name": "Jog test",
        "setList": [
          {
            "additionalFields": [
              {
                "fieldName": "accuracy",
                "fieldText": "Score",
                "fieldUnit": "%",
                "fieldValue": "99.17062",
                "shouldDisplay": false
              }
            ],
            "correctReps": 1,
            "incorrectReps": 0,
            "isSkipped": false,
            "time": 61,
            "totalReps": 1
          }
        ],
        "side": "left",
        "totalReps": 1,
        "totalSets": 1,
        "variationId": "",
        "variationName": ""
      },
      {
        "assignReps": 45,
        "correctReps": 42,
        "id": 259,
        "name": "Squat",
        "setList": [
          {
            "additionalFields": [
              {
                "fieldName": "accuracy",
                "fieldText": "Score",
                "fieldUnit": "%",
                "fieldValue": "93.333336",
                "shouldDisplay": false
              },
              {
                "fieldName": "reps",
                "fieldText": "Reps",
                "fieldUnit": "reps",
                "fieldValue": "42",
                "shouldDisplay": true
              }
            ],
            "correctReps": 42,
            "incorrectReps": 0,
            "isSkipped": false,
            "time": 90,
            "totalReps": 42
          }
        ],
        "side": "left",
        "totalReps": 42,
        "totalSets": 1,
        "variationId": "",
        "variationName": ""
      },
      {
        "assignReps": 1,
        "correctReps": 1,
        "id": 281,
        "name": "Stand and reach",
        "setList": [
          {
            "additionalFields": [
              {
                "fieldName": "accuracy",
                "fieldText": "Score",
                "fieldUnit": "%",
                "fieldValue": "75.11575",
                "shouldDisplay": false
              },
              {
                "fieldName": "Distance",
                "fieldText": "Distance",
                "fieldUnit": "CM",
                "fieldValue": "45.538174",
                "shouldDisplay": false
              }
            ],
            "correctReps": 1,
            "incorrectReps": 0,
            "isSkipped": false,
            "time": 10,
            "totalReps": 1
          }
        ],
        "side": "left",
        "totalReps": 1,
        "totalSets": 1,
        "variationId": "",
        "variationName": ""
      }
    ],
    "finalPainScore": "pending",
    "gender": "male",
    "height": 183,
    "initialPainScore": 0,
    "initialVAS": 0,
    "isLandmarksUploaded": false,
    "laterPainScore": "pending",
    "reportLink": "https://storage.googleapis.com/allycare-prod.appspot.com/fWOr2t8S94e0BIIlcUKkh7m629d2/GthcXa9eHlfnU2BGIIerrAoDZMH2/-OK76AihRKe9xdHFWjuY.pdf",
    "reportsDataId": "-OK76BS5l9VB-QMbIOEo",
    "timeElapsed": 193,
    "timestamp": 1740671597044,
    "vitalsMap": {
      "api_key": "CNCPg45zbVxGlB7r74xb",
      "employee_id": "SCAN_USER",
      "entry_time": "2025-02-27 15:53:11.840940+00:00",
      "health_risk_score": 16,
      "metadata": {
        "cardiovascular": {
          "cardiac_out": 6.3,
          "map": 96,
          "prq": 3.57
        },
        "fps": 114,
        "glucose_info": {
          "diabetes_control_score": 57.5,
          "hba1c": 5.2,
          "status": "beta"
        },
        "heart_scores": {
          "HRMax": 191,
          "HRR": "116",
          "THRR": "145 - 191",
          "heart_utilized": "40",
          "pNN50_per": 47.37,
          "rmssd": 23.64,
          "sdnn": 45.88,
          "stress_index": 1.4,
          "zone_details": {
            "highZoneRange": 94,
            "lowZoneRange": "--",
            "zone": "Rest"
          }
        },
        "physiological_scores": {
          "bloodvolume": "6354.9",
          "bmi": "33.15",
          "bodyfat": "33.36",
          "cal_carb": "93.51",
          "cal_fat": "6.49",
          "dob": "1999-06-05",
          "gender": "male",
          "height": "183.0",
          "intensity": "Hard",
          "tbw": "57.13",
          "tbwp": "51.47",
          "vo2max": "79.83",
          "weight": "111.0"
        }
      },
      "posture": "exercising",
      "scan_completion_time": "2025-02-27T15:53:16.002564+00:00",
      "scan_id": "069da947-4efd-4c31-8169-c02e4de8f639",
      "statusCode": 200,
      "vitals": {
        "bp_dia": 82,
        "bp_sys": 124,
        "heart_rate": 75,
        "oxy_sat_prcnt": 96,
        "resp_rate": 21
      },
      "wellness_score": 84
    },
    "weight": 111,
    "patientInfo": {
      "name": "John Smith",
      "age": 43,
      "medicalHistory": ["Hypertension", "Diabetes Type 2"],
      "notes": "Regular fitness assessment for health monitoring"
    },
    "status": "completed"
  },
  {
    "session_id": "session_002",
    "accuracy": 17,
    "assessmentResultId": "-OTafA4SqUgE6Y5xrqiI",
    "assessment_id": "as_card_01",
    "bodyCompositionData": {
      "AGR": "0.90",
      "BFC": "-0.90",
      "BMI": "9.51",
      "BMR": "995.39",
      "FM": "-0.18",
      "FMI": "-0.09",
      "LM": "20.18",
      "LMI": "9.60",
      "M_Age": "15",
      "WHGR": "0.37",
      "WHR": "1.01"
    },
    "exercises": [
      {
        "assignReps": 1,
        "correctReps": 1,
        "id": 73,
        "name": "Frontal body view",
        "setList": [
          {
            "additionalFields": [
              {
                "fieldName": "accuracy",
                "fieldText": "Score",
                "fieldUnit": "%",
                "fieldValue": "0",
                "shouldDisplay": false
              }
            ],
            "correctReps": 1,
            "incorrectReps": 0,
            "isSkipped": false,
            "time": 10,
            "totalReps": 1
          }
        ],
        "side": "left",
        "totalReps": 1,
        "totalSets": 1,
        "variationId": "\"\"",
        "variationName": "\"\""
      },
      {
        "assignReps": 1,
        "correctReps": 1,
        "id": 74,
        "name": "Side body view",
        "setList": [
          {
            "additionalFields": [
              {
                "fieldName": "accuracy",
                "fieldText": "Score",
                "fieldUnit": "%",
                "fieldValue": "0",
                "shouldDisplay": false
              }
            ],
            "correctReps": 1,
            "incorrectReps": 0,
            "isSkipped": false,
            "time": 10,
            "totalReps": 1
          }
        ],
        "side": "left",
        "totalReps": 1,
        "totalSets": 1,
        "variationId": "\"\"",
        "variationName": "\"\""
      },
      {
        "assignReps": 10,
        "correctReps": 0,
        "id": 235,
        "name": "Jog test",
        "setList": [
          {
            "additionalFields": [
              {
                "fieldName": "accuracy",
                "fieldText": "Score",
                "fieldUnit": "%",
                "fieldValue": "15.164222764530614",
                "shouldDisplay": false
              }
            ],
            "correctReps": 0,
            "incorrectReps": 0,
            "isSkipped": false,
            "time": 47,
            "totalReps": 0
          }
        ],
        "side": "left",
        "totalReps": 0,
        "totalSets": 1,
        "variationId": "\"\"",
        "variationName": "\"\""
      }
    ],
    "finalPainScore": "pending",
    "gender": "male",
    "height": 145,
    "initialPainScore": 0,
    "initialVAS": 0,
    "isLandmarksUploaded": false,
    "laterPainScore": "pending",
    "reportLink": "https://firebasestorage.googleapis.com/v0/b/rootallyai.appspot.com/o/reports%2FW2g8IThefhPc3SNAv46x2TT3hOB3%2FzHSezoe7w3exoakaC4dGGMneB0u2%2Fgugh_7713.pdf",
    "timeElapsed": 67,
    "timestamp": 1750848025493,
    "vitalsMap": {
      "api_key": "CNCPg45zbVxGlB7r74xb",
      "employee_id": "SCAN_USER",
      "entry_time": "2024-09-26 07:26:15.188795+00:00",
      "health_risk_score": 16,
      "metadata": {
        "cardiovascular": {
          "cardiac_out": 5.68,
          "map": 95.33,
          "prq": 3.47
        },
        "fps": 114,
        "glucose_info": {
          "diabetes_control_score": 77.5,
          "hba1c": 5.2,
          "status": "beta"
        },
        "heart_scores": {
          "HRMax": 191,
          "HRR": "125",
          "THRR": "< 90",
          "heart_utilized": "45",
          "pNN50_per": 37.66,
          "rmssd": 27.12,
          "sdnn": 50.81,
          "stress_index": 1.6,
          "zone_details": {
            "highZoneRange": 94,
            "lowZoneRange": "--",
            "zone": "Rest"
          }
        },
        "physiological_scores": {
          "bloodvolume": "5414.04",
          "bmi": "26.23",
          "bodyfat": "23.4",
          "cal_carb": "--",
          "cal_fat": "--",
          "dob": "1999-06-05",
          "gender": "male",
          "height": "180.0",
          "intensity": "Very Light",
          "tbw": "48.07",
          "tbwp": "56.55",
          "vo2max": "44.08",
          "weight": "85.0"
        }
      },
      "posture": "resting",
      "scan_completion_time": "2024-09-26T07:26:16.821174+00:00",
      "scan_id": "ce310698-d79a-4cd2-9df7-60de836d2786",
      "statusCode": 200,
      "user_id": "1abc0416-e7bd-47b3-9098-696d35f79408",
      "vitals": {
        "bp_dia": 75,
        "bp_sys": 110,
        "heart_rate": 66,
        "oxy_sat_prcnt": 95,
        "resp_rate": 19
      },
      "wellness_score": 84
    },
    "weight": 20,
    "patientInfo": {
      "name": "Emma Johnson",
      "age": 25,
      "medicalHistory": ["Asthma"],
      "notes": "Cardiac assessment for fitness evaluation"
    },
    "status": "completed"
  }
];

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDatabase();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Assessment.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`✅ Created user: ${userData.username}`);
    }

    // Create assessments
    console.log('📊 Creating assessments...');
    for (let i = 0; i < sampleAssessments.length; i++) {
      const assessmentData = sampleAssessments[i];
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      
      const assessment = new Assessment({
        ...assessmentData,
        createdBy: randomUser._id
      });
      
      await assessment.save();
      console.log(`✅ Created assessment: ${assessmentData.session_id}`);
    }

    // Create additional sample assessments for better demo
    console.log('📈 Creating additional sample assessments...');
    const additionalAssessments = [
      {
        session_id: "session_003",
        accuracy: 92,
        assessment_id: "as_hr_02",
        gender: "female",
        height: 165,
        weight: 58,
        timeElapsed: 245,
        timestamp: Date.now() - 86400000, // 1 day ago
        patientInfo: {
          name: "Sarah Wilson",
          age: 28,
          medicalHistory: [],
          notes: "Regular health checkup"
        },
        status: "completed"
      },
      {
        session_id: "session_004",
        accuracy: 65,
        assessment_id: "as_card_01",
        gender: "male",
        height: 178,
        weight: 85,
        timeElapsed: 180,
        timestamp: Date.now() - 172800000, // 2 days ago
        patientInfo: {
          name: "Michael Brown",
          age: 35,
          medicalHistory: ["High cholesterol"],
          notes: "Follow-up cardiac assessment"
        },
        status: "completed"
      },
      {
        session_id: "session_005",
        accuracy: 88,
        assessment_id: "as_hr_02",
        gender: "female",
        height: 160,
        weight: 52,
        timeElapsed: 210,
        timestamp: Date.now() - 259200000, // 3 days ago
        patientInfo: {
          name: "Lisa Davis",
          age: 31,
          medicalHistory: [],
          notes: "Pre-employment health assessment"
        },
        status: "completed"
      }
    ];

    for (const assessmentData of additionalAssessments) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const assessment = new Assessment({
        ...assessmentData,
        createdBy: randomUser._id,
        // Add minimal required fields for these simplified assessments
        assessmentResultId: `result_${assessmentData.session_id}`,
        bodyCompositionData: {
          BMI: "22.5",
          BFC: "15.2",
          LM: "45.8"
        },
        exercises: [],
        vitalsMap: {
          vitals: {
            heart_rate: 72,
            bp_sys: 120,
            bp_dia: 80,
            oxy_sat_prcnt: 98,
            resp_rate: 16
          },
          wellness_score: assessmentData.accuracy
        }
      });
      
      await assessment.save();
      console.log(`✅ Created additional assessment: ${assessmentData.session_id}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`👥 Created ${createdUsers.length} users`);
    console.log(`📊 Created ${sampleAssessments.length + additionalAssessments.length} assessments`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}