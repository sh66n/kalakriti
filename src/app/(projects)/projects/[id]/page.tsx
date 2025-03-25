import { getProject } from "@/lib/data";
import { IProject } from "@/models/project.schema";
import Link from "next/link";
import React from "react";
import DeleteButton from "@/components/DeleteButton";
import { auth } from "@/auth";

const Project = async ({ params }: any) => {
  const { id } = await params;
  const currentProject: IProject | null = await getProject(id);
  const session = await auth();
  if (!currentProject) return <div>Couldn't find what you're looking for!</div>;

  return (
    <div>
      <h1>
        {currentProject.title} - {currentProject._id}
      </h1>
      <div>{currentProject.description}</div>
      {currentProject.author._id === session?.user._id && (
        <div>
          <Link href={`${currentProject._id}/edit`}>Edit</Link>
          <DeleteButton id={id} />
        </div>
      )}
    </div>
  );
};

export default Project;
