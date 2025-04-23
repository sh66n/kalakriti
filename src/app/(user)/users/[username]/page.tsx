import { auth } from "@/auth";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, getUserByUsername } from "@/lib/data";
import React from "react";

const UserPage = async ({ params }: any) => {
  const { username } = await params;
  const session = await auth();
  const user = await getUserByUsername(username);
  console.log(user._id);
  const userProjects = await getProjects(user?._id);
  console.log(userProjects);
  return (
    <div className="pt-35 text-white mx-56 mb-10">
      <div className="flex items-center mb-4">
        <div
          className="h-12 w-12 bg-red-100 bg-cover rounded-full mr-4"
          style={{ backgroundImage: `url(${user?.avatar})` }}
        ></div>
        <div className="text-2xl">{user.name}</div>
      </div>
      <hr className="border-0 h-0.25 bg-[#2e2e2e] mb-4" />

      <div className="grid grid-cols-3 gap-6">
        {userProjects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
