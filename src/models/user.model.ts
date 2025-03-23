import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
  password?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || model<IUser>("User", userSchema);
