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
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project || model<IProject>("Project", projectSchema);
