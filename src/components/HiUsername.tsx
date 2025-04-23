"use client";
import React, { useState, useEffect, useRef } from "react";
import Backdrop from "./Backdrop";
import Link from "next/link";
import { SignOut } from "./SignOut";

const HiUsername = ({ session }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Backdrop>
      <div className="group relative" ref={containerRef} onClick={handleClick}>
        Hi, {session.user?.name}
        <div className="h-4 w-4 inline-block pt-1 ml-2">
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
        {isVisible && (
          <div className="absolute top-full right-0 origin-top rounded-sm w-50 border border-[#171717] p-3 mt-2 text-sm bg-black">
            <div className="mb-2">
              <Link href={`/users/${session.user.username}`}>Settings</Link>
            </div>
            <div className="mb-2">
              <Link href={`/users/${session.user.username}`}>Your profile</Link>
            </div>
            <div className="mb-2">
              <Link href={`/projects/new`}>Submit a project</Link>
            </div>
            <hr className="border-0 h-0.5 bg-[#171717]" />
            <div className="my-2">
              <SignOut />
            </div>
          </div>
        )}
      </div>
    </Backdrop>
  );
};

export default HiUsername;
