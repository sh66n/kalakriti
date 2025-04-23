// Check if we're in a browser/edge environment
const mongoose = (() => {
  let m;
  try {
    // Only import mongoose in server environments
    m = require("mongoose");
  } catch (e) {
    // In edge runtime, return a minimal API that won't crash
    return {
      models: {},
      model: () => {},
      Schema: function () {
        return {};
      },
    };
  }
  return m;
})();

export interface IUser {
  _id: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
  password?: string;
}

const userSchema = new mongoose.Schema(
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

// Only create the model in server environments
export const User =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
