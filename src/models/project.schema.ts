import { Types } from "mongoose";
import { z } from "zod";

export const zProject = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  images: z.array(z.string()),
});

export interface IProject {
  _id: string;
  title: string;
  description: string;
  author: Types.ObjectId;
  images: string[];
}
