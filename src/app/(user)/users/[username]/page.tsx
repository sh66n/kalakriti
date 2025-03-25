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
    <div>
      <div className="flex items-center mb-10">
        <div
          className="h-24 w-24 bg-red-100 bg-cover rounded-full mr-4"
          style={{ backgroundImage: `url(${user?.avatar})` }}
        ></div>
        <div className="text-3xl">{user.username}</div>
      </div>
      <div className="text-xl text-center">My Projects</div>
      <div className="grid grid-cols-3 mx-56 gap-6">
        {userProjects?.map((project) => (
          <ProjectCard key={project._id} id={project._id} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
