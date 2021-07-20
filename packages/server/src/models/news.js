import { Schema, model } from 'mongoose';

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please Provide a title'],
      unique: [true, 'Title already exists'],
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    imgId: {
      type: String,
    },
    file: {
      type: String,
    },
    status: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    target: {
      type: String,
      required: [true, 'Please provide a target audience'],
      default: 'CST',
    },
    targetType: {
      type: String,
      required: [true, 'Please provide a target audience type'],
      default: 'campus',
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the creator'],
    },
  },
  {
    timestamps: true,
  }
);

export default model('News', NewsSchema);
