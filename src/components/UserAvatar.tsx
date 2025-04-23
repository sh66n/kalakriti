import { auth } from "@/auth";
import { getUserByUsername } from "@/lib/data";
import React from "react";

const UserAvatar = async ({ username }: any) => {
  const user = await getUserByUsername(username);
  return (
    <div className="flex items-center p-2 rounded-sm">
      <div
        className="h-5 w-5 bg-red-100 bg-cover rounded-full"
        style={{ backgroundImage: `url(${user.avatar})` }}
      ></div>
    </div>
  );
};

export default UserAvatar;
