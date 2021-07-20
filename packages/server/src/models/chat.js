import { Schema, model } from 'mongoose';
import emitter from '../utils/eventEmitters';

const UserSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, 'Please Provide a body'],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please Provide an author'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.post('save', (chat) => {
  emitter.emit('new chat', { _id: chat._id });
});

export default model('Chat', UserSchema);
