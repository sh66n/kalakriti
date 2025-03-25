import { auth } from "@/auth";
import { getUserByUsername } from "@/lib/data";
import React from "react";

const UserAvatar = async ({ username }: any) => {
  const user = await getUserByUsername(username);
  return (
    <div className="flex items-center bg-pink-200 p-2 rounded-sm">
      <div className="mr-5">{user?.username}</div>
      <div
        className="h-12 w-12 bg-red-100 bg-cover rounded-full"
        style={{ backgroundImage: `url(${user.avatar})` }}
      ></div>
    </div>
  );
};

export default UserAvatar;
