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
    link: "",
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
    formData.append("link", formState.link);

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
        theme: "dark",
      });
      router.push("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-2xl p-8 rounded-2xl shadow-lg space-y-6 text-white mt-10"
    >
      <h2 className="text-3xl mb-4">New Submission</h2>

      <div className="flex items-center">
        <label htmlFor="title" className="block text-sm w-1/4">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          placeholder="Enter a project title"
          className="w-3/4 p-2 rounded-sm border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <label htmlFor="description" className="block text-sm w-1/4">
          Project URL
        </label>
        <input
          type="text"
          name="link"
          value={formState.link}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-3/4 p-2 rounded-sm border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="images" className="block text-sm hover:cursor-pointer">
          Upload Images
        </label>
        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#171717] file:text-white hover:opacity-50 hover:cursor-pointer"
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-24 h-24 relative rounded overflow-hidden border border-zinc-700"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#171717] hover:opacity-50 hover:cursor-pointer transition-colors duration-300 text-white  py-3 rounded-lg"
      >
        Submit Project
      </button>
    </form>
  );
};

export default NewProjectForm;
