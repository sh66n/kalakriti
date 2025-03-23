import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import Link from "next/link";
import React from "react";
import { getProjects } from "./projects/page";

const Home = async () => {
  const session = await auth();
  return (
    <div>
      <div className="flex flex-col">
        <div
          className="h-24 w-24 bg-red-100 bg-cover rounded-full"
          style={{ backgroundImage: `url(${session.user?.image})` }}
        ></div>
        <SignOut />
      </div>
    </div>
  );
};

export default Home;
