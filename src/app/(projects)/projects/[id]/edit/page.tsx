"use client";
import { getProject } from "@/lib/data";
import { zProject } from "@/models/project.schema";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formState, setFormState] = useState({
    title: "Loading...",
    description: "Loading...",
  });

  console.log(formState);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Convert id to string if it's an array
        const projectId = Array.isArray(id) ? id[0] : id;
        const data = await getProject(projectId);
        if (data) {
          delete data._id;
          const authorId = data.author._id;
          delete data.author;
          data.author = authorId;
          setFormState(data);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    try {
      evt.preventDefault();
      zProject.parse(formState);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(formState),
        }
      );
      const data = await res.json();
      if (res.ok) {
        router.push("/projects");
        toast.success("Edited successfully", {
          position: "top-left",
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={formState.title}
        />
        <input
          type="text"
          onChange={handleChange}
          name="description"
          value={formState.description}
        />
        <button>Edit</button>
      </form>
    </div>
  );
};

export default Edit;
