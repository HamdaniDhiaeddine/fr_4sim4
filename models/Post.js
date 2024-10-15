import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  facture: {
    type: String,
  },
  titre: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  etat: {
    type: String,
    enum: ['futur', 'past'],
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
