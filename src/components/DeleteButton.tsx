"use client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteButton = ({ id }: any) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) console.log("It is done.");
      router.push("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={() => handleDelete(id)}>Delete</button>;
};

export default DeleteButton;
