import { auth } from "@/auth";
import { IProject } from "@/models/project.model";
import React from "react";
import axios from "axios";
import { cookies } from "next/headers";

export const getProjects = async (): Promise<IProject[] | null> => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("authjs.session-token");
    const { data } = await axios.get("http://localhost:3000/api/projects", {
      withCredentials: true,
      headers: {
        Cookie: `authjs.session-token=${sessionToken?.value || ""}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Projects = async () => {
  const session = await auth();
  const projects: IProject[] | null = await getProjects();
  return (
    <div>
      {projects &&
        projects.map((project) => <li key={project._id}>{project.title}</li>)}
    </div>
  );
};

export default Projects;
