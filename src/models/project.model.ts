import mongoose, { Schema, model } from "mongoose";
import { z } from "zod";

export const zProject = z.object({
  title: z.string(),
  description: z.string(),
});

export interface IProject {
  title: string;
  description: string;
}

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
