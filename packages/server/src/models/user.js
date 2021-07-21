import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Provide a name'],
    },
    campus: {
      type: String,
      required: [true, 'Please Provide a campus'],
      enum: ['CST'],
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/redjanvier/image/upload/v1592564639/blank-profile-picture-973460_640_l3acum.png',
    },
    imageId: {
      type: String,
    },
    school: {
      type: String,
      required: [true, 'Please Provide a school'],
      enum: ['ICT', 'ENG', 'MIN', 'SCI', 'ARC'],
    },
    department: {
      type: String,
      required: [true, 'Please Provide a department'],
    },
    class: {
      type: String,
      required: [true, 'Please Provide a class'],
    },
    role: {
      type: String,
      required: [true, 'Please Provide a class'],
      default: 'student',
      enum: ['student', 'staff', 'admin'],
    },
    regNumber: {
      type: Number,
      unique: [true, 'Registration number already in use'],
      required: [true, 'Please Provide a valid UR Registration Number'],
      match: /^2([0-9]{7})$/,
    },
    password: {
      type: String,
      required: [true, 'Please Provide a password'],
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', UserSchema);
