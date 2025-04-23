import { getProject } from "@/lib/data";
import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const ProjectCard = async ({ project }: any) => {
  console.log(project);
  const timeAgo = formatDistanceToNow(project.updatedAt, { addSuffix: true });

  return (
    <Link href={`/projects/${project?._id}`}>
      <div className="text-white">
        <div className="h-[15rem] w-full bg-white overflow-hidden p-3 rounded-sm">
          <Image
            src={project.images[0]}
            alt="1"
            width={160 * 3}
            height={90 * 3}
            className="object-cover w-full h-full"
          ></Image>
        </div>
        <div className="w-full flex mt-2 gap-2">
          <div className="truncate w-fit max-w-3/4">{project.title} </div>
          <div className="w-fit text-[#8a8a8a]">{timeAgo}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
