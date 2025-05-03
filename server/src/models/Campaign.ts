import mongoose, { Document, Schema } from 'mongoose';

export enum CampaignStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export interface ICampaign extends Document {
  name: string;
  description: string;
  status: CampaignStatus;
  leads: string[];
  accountIDs: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      required: [true, 'Campaign name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Campaign description is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: Object.values(CampaignStatus),
        message: `Status must be one of: ${Object.values(CampaignStatus).join(', ')}`
      },
      default: CampaignStatus.ACTIVE,
      set: (status: string) => status.toLowerCase() // Always convert to lowercase
    },
    leads: {
      type: [String],
      default: [],
    },
    accountIDs: {
      type: [Schema.Types.ObjectId],
      default: [],
      validate: {
        validator: function(v: mongoose.Types.ObjectId[]) {
          return v.every(item => mongoose.Types.ObjectId.isValid(item));
        },
        message: 'accountIDs must be valid ObjectIds'
      }
    },
  },
  { timestamps: true }
);

// Pre-save middleware to ensure status is always lowercase
campaignSchema.pre('save', function(this: ICampaign, next) {
  if (this.status) {
    this.status = this.status.toLowerCase() as CampaignStatus;
  }
  next();
});

export default mongoose.model<ICampaign>('Campaign', campaignSchema); 