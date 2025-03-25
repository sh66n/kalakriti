import { auth } from "@/auth";
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
      <div
        className="h-24 w-24 bg-red-100 bg-cover rounded-full"
        style={{ backgroundImage: `url(${user?.avatar})` }}
      ></div>
      <ul>
        {userProjects?.map((project) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
