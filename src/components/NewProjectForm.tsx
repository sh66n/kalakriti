"use client";
import axios from "axios";
import { zProject } from "@/models/project.schema";
import React, { useState } from "react";

const NewProjectForm = () => {
  const [formState, setFormData] = useState({
    title: null,
    description: null,
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    zProject.parse(formState);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
        JSON.stringify(formState)
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" onChange={handleChange} />
      <input type="text" name="description" onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
};

export default NewProjectForm;
