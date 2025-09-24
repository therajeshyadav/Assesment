import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: Number,
  reportType: {
    type: String,
    enum: ['as_hr_02', 'as_card_01'],
    required: true
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['generating', 'completed', 'failed'],
    default: 'generating'
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  lastDownloaded: Date,
  metadata: {
    sections: Number,
    fields: Number,
    processingTime: Number,
    configVersion: String
  },
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
reportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
reportSchema.index({ sessionId: 1 });
reportSchema.index({ assessmentId: 1 });
reportSchema.index({ generatedBy: 1 });
reportSchema.index({ createdAt: -1 });
reportSchema.index({ status: 1 });

export const Report = mongoose.model('Report', reportSchema);