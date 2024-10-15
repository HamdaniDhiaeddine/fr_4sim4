import mongoose from 'mongoose';  

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
    unique: true,
  },
  numTel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  discount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
