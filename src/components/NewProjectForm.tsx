"use client";
import axios from "axios";
import { zProject } from "@/models/project.schema";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NewProjectForm = () => {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    images: [] as File[],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(fileArray);
      setFormState((prev) => ({
        ...prev,
        images: fileArray,
      }));
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);

    formState.images.forEach((file, index) => {
      formData.append(`images`, file);
    });

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Your project has been listed successfully!", {
        position: "top-left",
        theme: "light",
      });
      router.push("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="title"
        value={formState.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={formState.description}
        onChange={handleChange}
      />
      <input
        type="file"
        name="images"
        accept="image/*"
        onChange={handleFileChange}
        multiple
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewProjectForm;
