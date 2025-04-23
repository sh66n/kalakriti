"use client";
import { getRepoFiles } from "@/lib/data";
import React from "react";

const Repository = ({ repo, username }) => {
  const handleClick = async () => {
    // const data = await getRepoFiles(username, repo.name);
    // console.log(data);
  };
  return (
    <div className="flex justify-between">
      <div>{repo.full_name}</div>
      <div>
        <button className="bg-lime-500 p-2 rounded-sm" onClick={handleClick}>
          Import
        </button>
      </div>
    </div>
  );
};

export default Repository;
