import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  name: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
