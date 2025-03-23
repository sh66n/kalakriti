import { auth } from "@/auth";
import { IProject } from "@/models/project.model";
import React from "react";
import axios from "axios";

export const getProjects = async () => {
  try {
    // const res = await fetch(`http://localhost:3000/api/projects`);
    // const data = await res.json();
    const { data } = await axios.get("http://localhost:3000/api/projects");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Projects = async () => {
  const session = await auth();
  const projects: IProject[] | null = await getProjects();
  return <div>Projects</div>;
};

export default Projects;
