import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true
    },
    providers: {
      type: [String],
      enum: ['google', 'password', 'firebase'],
      default: []
    },
    role: {
      type: String,
      enum: ['student', 'alumni', 'admin'],
      default: 'student'
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'banned'],
      default: 'active'
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    lastLoginAt: Date
  },
  {
    timestamps: true,
    toJSON: {
      transform(_document, value) {
        value.id = value._id.toString();
        delete value._id;
        delete value.__v;
        delete value.googleId;
        delete value.firebaseUid;
        return value;
      }
    }
  }
);

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);

