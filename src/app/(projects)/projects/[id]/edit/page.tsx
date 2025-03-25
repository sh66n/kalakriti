"use client";
import { getProject } from "@/lib/data";
import { zProject } from "@/models/project.schema";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Edit = ({ params }: any) => {
  const { id } = useParams();
  const router = useRouter();

  const [formState, setFormState] = useState({
    title: "Loading...",
    description: "Loading...",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getProject(id);
        if (data) {
          delete data._id;
          delete data.__v;
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
      if (res.ok) router.push("/projects");
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
