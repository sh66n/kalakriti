import { Types } from "mongoose";
import { z } from "zod";

export const zProject = z.object({
  title: z.string(),
  description: z.optional(z.string()),
  author: z.string(),
  link: z.optional(z.string()),
  images: z.array(z.string()),
  collaborators: z.optional(z.array(z.string())),
});

export interface IProject {
  _id: string;
  title: string;
  description: string;
  author: Types.ObjectId;
  link: string;
  images: string[];
  collaborators?: string[];
}
