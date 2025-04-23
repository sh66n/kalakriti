import AddGithubProject from "@/components/AddGithubProject";
import NewProjectForm from "@/components/NewProjectForm";
import React from "react";

const New = () => {
  return (
    <div className="pt-25 min-h-screen w-full flex">
      <div className="grow w-1/4 border-r border-r-[#171717]"></div>
      <div className="grow w-3/4">
        <NewProjectForm />
        {/* <AddGithubProject /> */}
      </div>
    </div>
  );
};

export default New;
