"use server";
import { Project } from "@/models/project.model";
import { connectToDb } from "./connectToDb";
import { IProject, zProject } from "@/models/project.schema";

export const getProject = async (id: string): Promise<IProject | null> => {
  try {
    await connectToDb();
    const mongooseProject = await Project.findById(id);
    const plainProject = JSON.parse(JSON.stringify(mongooseProject));
    return plainProject;
  } catch (error) {
    return null;
  }
};
