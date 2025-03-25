import { auth } from "@/auth";
import { IProject } from "@/models/project.model";
import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

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
      <div className="relative min-h-screen">
        <div className="grid grid-cols-4 gap-2 mx-24">
          {projects &&
            projects.map((project) => (
              <ProjectCard key={project._id} id={project._id} />
            ))}
        </div>

        <Link href={"/projects/new"}>
          <div className="fixed bottom-5 right-5 h-[5rem] w-[5rem] bg-blue-500 flex items-center justify-center rounded-lg text-5xl">
            +
          </div>
        </Link>
      </div>
      <div className="min-h-screen"></div>
    </div>
  );
};

export default Projects;
