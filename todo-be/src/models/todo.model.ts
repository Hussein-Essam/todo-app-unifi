import { model, Schema, Document } from 'mongoose';
import User from './user.model';

interface ITodo extends Document {
  user: string;
  title: string;
  description: string;
  completed: boolean;
}
const todoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

todoSchema.index({ user: 1 });

todoSchema.path('user').validate(async (userId: string) => {
  const user = await User.findById(userId);
  return user !== null;
}, 'Invalid user ID');

const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;
