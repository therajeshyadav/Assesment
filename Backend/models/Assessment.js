import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  assignReps: Number,
  correctReps: Number,
  totalReps: Number,
  totalSets: Number,
  side: String,
  variationId: String,
  variationName: String,
  analysisScore: Number,
  analysisList: [String],
  tipsList: [String],
  setList: [{
    correctReps: Number,
    incorrectReps: Number,
    isSkipped: Boolean,
    time: Number,
    totalReps: Number,
    additionalFields: [{
      fieldName: String,
      fieldText: String,
      fieldUnit: String,
      fieldValue: String,
      shouldDisplay: Boolean
    }]
  }]
});

const bodyCompositionSchema = new mongoose.Schema({
  AGR: String,
  Age: String,
  BFC: String,
  BMI: String,
  BMR: String,
  FM: String,
  FMI: String,
  HeightM: String,
  LM: String,
  LMI: String,
  M_Age: String,
  WHGR: String,
  WHR: String
});

const vitalsMapSchema = new mongoose.Schema({
  api_key: String,
  employee_id: String,
  entry_time: String,
  health_risk_score: Number,
  metadata: {
    cardiovascular: {
      cardiac_out: Number,
      map: Number,
      prq: Number
    },
    fps: Number,
    glucose_info: {
      diabetes_control_score: Number,
      hba1c: Number,
      status: String
    },
    heart_scores: {
      HRMax: Number,
      HRR: String,
      THRR: String,
      heart_utilized: String,
      pNN50_per: Number,
      rmssd: Number,
      sdnn: Number,
      stress_index: Number,
      zone_details: {
        highZoneRange: Number,
        lowZoneRange: String,
        zone: String
      }
    },
    physiological_scores: {
      bloodvolume: String,
      bmi: String,
      bodyfat: String,
      cal_carb: String,
      cal_fat: String,
      dob: String,
      gender: String,
      height: String,
      intensity: String,
      tbw: String,
      tbwp: String,
      vo2max: String,
      weight: String
    }
  },
  posture: String,
  scan_completion_time: String,
  scan_id: String,
  statusCode: Number,
  user_id: String,
  vitals: {
    bp_dia: Number,
    bp_sys: Number,
    heart_rate: Number,
    oxy_sat_prcnt: Number,
    resp_rate: Number
  },
  wellness_score: Number
});

const assessmentSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  accuracy: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  assessmentResultId: String,
  assessment_id: {
    type: String,
    required: true,
    enum: ['as_hr_02', 'as_card_01'],
    index: true
  },
  bodyCompositionData: bodyCompositionSchema,
  exercises: [exerciseSchema],
  finalPainScore: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  height: {
    type: Number,
    required: true,
    min: 50,
    max: 300
  },
  weight: {
    type: Number,
    required: true,
    min: 20,
    max: 500
  },
  initialPainScore: Number,
  initialVAS: Number,
  isLandmarksUploaded: Boolean,
  laterPainScore: String,
  reportLink: String,
  reportsDataId: String,
  timeElapsed: {
    type: Number,
    required: true,
    min: 0
  },
  timestamp: {
    type: Number,
    required: true,
    index: true
  },
  vitalsMap: vitalsMapSchema,
  
  // Additional fields for better management
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  patientInfo: {
    name: String,
    age: Number,
    medicalHistory: [String],
    notes: String
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed', 'in_progress'],
    default: 'completed'
  },
  reportGenerated: {
    type: Boolean,
    default: false
  },
  reportPath: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
assessmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
assessmentSchema.index({ session_id: 1 });
assessmentSchema.index({ assessment_id: 1 });
assessmentSchema.index({ timestamp: -1 });
assessmentSchema.index({ createdBy: 1 });
assessmentSchema.index({ status: 1 });
assessmentSchema.index({ createdAt: -1 });

export const Assessment = mongoose.model('Assessment', assessmentSchema);