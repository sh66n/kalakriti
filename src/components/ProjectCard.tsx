import { getProject, getUserByUsername } from "@/lib/data";
import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

const ProjectCard = async ({ id }: any) => {
  const project = await getProject(id);
  console.log(project);
  return (
    <Link href={`/projects/${project?._id}`}>
      <div className="bg-pink-100 rounded-sm flex flex-col items-center p-6 ">
        <div
          className="bg-cover bg-center h-[14rem] w-[14rem]"
          style={{ backgroundImage: `url(${project.images[0]})` }}
        ></div>
        <div className="text-xl">{project.title}</div>
        <div className="">{project?.description}</div>
        <div>
          <UserAvatar username={project?.author.username} />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
