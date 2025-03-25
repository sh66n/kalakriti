"use client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: any) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        router.push("/projects");
        toast.success("Deleted successfully", {
          position: "top-left",
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={() => handleDelete(id)}>Delete</button>;
};

export default DeleteButton;
