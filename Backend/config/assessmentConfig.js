// Configuration-driven assessment system - matches assignment requirements exactly
export const assessmentConfigs = {
  "as_hr_02": {
    name: "Health & Fitness Assessment",
    sections: [
      {
        id: "key_vitals",
        title: "Key Body Vitals",
        fields: [
          {
            id: "overall_health_score",
            label: "Overall Health Score",
            path: "accuracy",
            unit: "%",
            classification: {
              excellent: { min: 90, max: 100 },
              good: { min: 70, max: 89 },
              fair: { min: 50, max: 69 },
              poor: { min: 0, max: 49 }
            }
          },
          {
            id: "heart_rate",
            label: "Heart Rate",
            path: "vitalsMap.vitals.heart_rate",
            unit: "bpm",
            classification: {
              excellent: { min: 60, max: 80 },
              good: { min: 50, max: 100 },
              fair: { min: 40, max: 120 },
              poor: { min: 0, max: 200 }
            }
          },
          {
            id: "blood_pressure_systolic",
            label: "Blood Pressure (Systolic)",
            path: "vitalsMap.vitals.bp_sys",
            unit: "mmHg"
          },
          {
            id: "blood_pressure_diastolic",
            label: "Blood Pressure (Diastolic)",
            path: "vitalsMap.vitals.bp_dia",
            unit: "mmHg"
          }
        ]
      },
      {
        id: "heart_health",
        title: "Heart Health",
        fields: [
          {
            id: "wellness_score",
            label: "Wellness Score",
            path: "vitalsMap.wellness_score",
            unit: "%"
          },
          {
            id: "stress_index",
            label: "Stress Index",
            path: "vitalsMap.metadata.heart_scores.stress_index",
            unit: ""
          }
        ]
      },
      {
        id: "stress_level",
        title: "Stress Level",
        fields: [
          {
            id: "stress_index_detailed",
            label: "Stress Index",
            path: "vitalsMap.metadata.heart_scores.stress_index",
            unit: "",
            classification: {
              low: { min: 0, max: 1.0 },
              moderate: { min: 1.1, max: 2.0 },
              high: { min: 2.1, max: 5.0 }
            }
          },
          {
            id: "heart_rate_variability",
            label: "Heart Rate Variability (RMSSD)",
            path: "vitalsMap.metadata.heart_scores.rmssd",
            unit: "ms"
          }
        ]
      },
      {
        id: "fitness_levels",
        title: "Fitness Levels",
        fields: [
          {
            id: "cardiovascular_endurance",
            label: "Cardiovascular Endurance",
            path: "exercises[id=235].setList[0].time",
            unit: "seconds"
          },
          {
            id: "vo2_max",
            label: "VO2 Max",
            path: "vitalsMap.metadata.physiological_scores.vo2max",
            unit: "ml/kg/min"
          },
          {
            id: "squat_reps",
            label: "Squat Performance",
            path: "exercises[id=259].correctReps",
            unit: "reps"
          }
        ]
      },
      {
        id: "posture",
        title: "Posture",
        fields: [
          {
            id: "frontal_analysis_score",
            label: "Frontal View Analysis",
            path: "exercises[id=73].analysisScore",
            unit: "%"
          },
          {
            id: "side_analysis_score",
            label: "Side View Analysis",
            path: "exercises[id=74].analysisScore",
            unit: "%"
          }
        ]
      },
      {
        id: "body_composition",
        title: "Body Composition",
        fields: [
          {
            id: "bmi",
            label: "BMI",
            path: "bodyCompositionData.BMI",
            unit: "kg/m²",
            classification: {
              underweight: { min: 0, max: 18.5 },
              normal: { min: 18.5, max: 24.9 },
              overweight: { min: 25, max: 29.9 },
              obese: { min: 30, max: 50 }
            }
          },
          {
            id: "body_fat",
            label: "Body Fat Percentage",
            path: "vitalsMap.metadata.physiological_scores.bodyfat",
            unit: "%"
          },
          {
            id: "lean_mass",
            label: "Lean Mass",
            path: "bodyCompositionData.LM",
            unit: "kg"
          }
        ]
      }
    ]
  },
  "as_card_01": {
    name: "Cardiac Assessment",
    sections: [
      {
        id: "key_vitals",
        title: "Key Body Vitals",
        fields: [
          {
            id: "overall_health_score",
            label: "Overall Health Score",
            path: "accuracy",
            unit: "%"
          },
          {
            id: "heart_rate",
            label: "Heart Rate",
            path: "vitalsMap.vitals.heart_rate",
            unit: "bpm"
          },
          {
            id: "blood_pressure_systolic",
            label: "Blood Pressure (Systolic)",
            path: "vitalsMap.vitals.bp_sys",
            unit: "mmHg"
          },
          {
            id: "blood_pressure_diastolic",
            label: "Blood Pressure (Diastolic)",
            path: "vitalsMap.vitals.bp_dia",
            unit: "mmHg"
          }
        ]
      },
      {
        id: "cardiovascular_endurance",
        title: "Cardiovascular Endurance",
        fields: [
          {
            id: "jog_test_time",
            label: "Jog Test Duration",
            path: "exercises[id=235].setList[0].time",
            unit: "seconds"
          },
          {
            id: "cardiac_output",
            label: "Cardiac Output",
            path: "vitalsMap.metadata.cardiovascular.cardiac_out",
            unit: "L/min"
          },
          {
            id: "vo2_max",
            label: "VO2 Max",
            path: "vitalsMap.metadata.physiological_scores.vo2max",
            unit: "ml/kg/min"
          }
        ]
      },
      {
        id: "body_composition",
        title: "Body Composition",
        fields: [
          {
            id: "bmi",
            label: "BMI",
            path: "bodyCompositionData.BMI",
            unit: "kg/m²"
          },
          {
            id: "body_fat",
            label: "Body Fat Percentage",
            path: "vitalsMap.metadata.physiological_scores.bodyfat",
            unit: "%"
          }
        ]
      }
    ]
  }
};