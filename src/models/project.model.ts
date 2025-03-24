import mongoose, { Schema, model } from "mongoose";
import { IProject } from "./project.schema";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project || model<IProject>("Project", projectSchema);
