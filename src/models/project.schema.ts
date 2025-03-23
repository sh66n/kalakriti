import { z } from "zod";

export const zProject = z.object({
  title: z.string(),
  description: z.string(),
});

export interface IProject {
  _id: string;
  title: string;
  description: string;
}
