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

export const getUserRepositories = async (username: string) => {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
    );
    const repos = await res.json();
    return repos;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getRepoFiles(owner, repo, path = "") {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }

  const data = await response.json();
  let allFiles = [];

  for (const item of data) {
    if (item.type === "file") {
      allFiles.push({
        path: item.path,
        download_url: item.download_url,
      });
    } else if (item.type === "dir") {
      const subFiles = await getRepoFiles(owner, repo, item.path);
      allFiles = allFiles.concat(subFiles);
    }
  }

  return allFiles;
}
