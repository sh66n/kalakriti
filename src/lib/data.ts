"use server";
import { Project } from "@/models/project.model";
import { connectToDb } from "./connectToDb";
import { IProject, zProject } from "@/models/project.schema";
import { IUser, User } from "@/models/user.model";

export const getProjects = async (user_id): Promise<IProject[] | null> => {
  try {
    await connectToDb();
    console.log(user_id);
    const projects = await Project.find({ author: user_id });
    return projects;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProject = async (id: string): Promise<IProject | null> => {
  try {
    await connectToDb();
    const mongooseProject = await Project.findById(id).populate("author");
    const plainProject = JSON.parse(JSON.stringify(mongooseProject));
    return plainProject;
  } catch (error) {
    return null;
  }
};

export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  try {
    await connectToDb();
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
