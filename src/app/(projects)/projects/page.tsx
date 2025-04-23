import { auth } from "@/auth";
import { IProject } from "@/models/project.model";
import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

const getProjects = async (): Promise<IProject[] | null> => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("authjs.session-token");
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
      {
        withCredentials: true,
        headers: {
          Cookie: `authjs.session-token=${sessionToken?.value || ""}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Projects = async () => {
  const session = await auth();
  const projects: IProject[] | null = await getProjects();
  projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="min-h-screen pt-35  text-white mb-20">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-5 pl-[30rem]">Explore Projects</h1>
        <hr className="border-0 h-0.25 bg-[#2e2e2e] mb-4" />
        <div className="mb-10 flex pl-[28rem]">
          <div className="h-6 w-6 rounded-full bg-[#171717] p-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
          </div>

          <ul className="flex gap-8 text-[#8a8a8a] ml-2">
            <li>Popular Categories</li>
            <li>Styles</li>
            <li>Types</li>
            <li>Subjects</li>
            <li>Platforms</li>
          </ul>
        </div>

        {projects?.length ? (
          <div className="grid grid-cols-3 gap-y-4 gap-x-16">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
