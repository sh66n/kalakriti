import Link from "next/link";
import React from "react";
import SignIn from "./SignIn";
import { auth } from "@/auth";
import { SignOut } from "./SignOut";
import Backdrop from "./Backdrop";
import HiUsername from "./HiUsername";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="bg-black text-white px-10 py-8 flex justify-between items-center fixed z-1000 w-full border-b border-b-[#2e2e2e]">
      <div className="w-1/4">
        <Link href={"/"} className="flex">
          <div className="group flex items-center">
            <div className="bg-red-500 h-[2.5rem] w-[2.5rem] rounded-full mr-[0.8rem]"></div>
            <div className="text-xl opacity-0 group-hover:opacity-100 duration-300">
              kalakriti
            </div>
          </div>
        </Link>
      </div>
      <div className="w-1/3 grow flex justify-center gap-8">
        <div>
          <Backdrop>
            <Link href={"/projects"}>Projects</Link>
          </Backdrop>
        </div>
        <div>
          <Backdrop>
            <Link href={"/users"}>Profiles</Link>
          </Backdrop>
        </div>
        <div>
          <Backdrop>
            <Link href={"/about"}>About Us</Link>
          </Backdrop>
        </div>
        <div>
          <Backdrop>
            <Link href={"/search"}>Search</Link>
          </Backdrop>
        </div>
      </div>
      <div className="w-1/4 flex justify-end pr-10">
        {session ? <HiUsername session={session} /> : <SignIn />}
      </div>
    </div>
  );
};

export default Navbar;
