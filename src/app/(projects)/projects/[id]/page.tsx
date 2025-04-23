import { getProject } from "@/lib/data";
import { IProject } from "@/models/project.schema";
import Link from "next/link";
import React from "react";
import DeleteButton from "@/components/DeleteButton";
import { auth } from "@/auth";
import Image from "next/image";
import Backdrop from "@/components/Backdrop";

const Project = async ({ params }: any) => {
  const { id } = await params;
  const currentProject: IProject | null = await getProject(id);
  const session = await auth();

  if (!currentProject)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Couldn't find what you're looking for!
      </div>
    );

  return (
    <div className="pt-35 min-h-screen text-white flex gap-4">
      <div className="grow w-2/4 px-4">
        <Link
          href={`https://${currentProject.link}`}
          target="_blank"
          rel="noreferrer"
        >
          <div className="bg-[#171717] rounded-full px-4 py-2 mb-8 ml-4 flex w-fit justify-center items-center hover:opacity-50">
            <div>{currentProject.link}</div>
            <div className="h-8 w-8 flex items-center justify-center bg-[#171717] p-2 rounded-full">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </g>
              </svg>
            </div>
          </div>
        </Link>
        <hr className="border-0 h-0.25 bg-[#2e2e2e] mb-4" />
        <div className="flex px-4">
          <div className="mr-40">
            <div className="text-[#8a8a8a]">Published</div>
            {new Date(currentProject.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div>
            <div className="text-[#8a8a8a]">Categories</div>
            <ul>
              <li>Consumer</li>
              <li>Food & Drink</li>
              <li>E-commerce</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grow w-3/4 flex flex-col">
        <div className="mb-10 flex justify-between">
          <div className="text-2xl">{currentProject.title}</div>
          <div className="flex gap-2">
            <div className="h-8 w-8 flex items-center justify-center bg-[#171717] p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"></path>
              </svg>
            </div>
            <div className="h-8 w-8 flex items-center justify-center bg-[#171717] p-2 rounded-full mr-10">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <div className="grow">
          <div className="bg-white p-3 w-fit rounded-sm">
            <Image
              src={currentProject.images[0]}
              width={160 * 5}
              height={90 * 5}
              alt="1"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
