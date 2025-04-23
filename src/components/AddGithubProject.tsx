import React from "react";
import UserAvatar from "./UserAvatar";
import { auth } from "@/auth";
import { getUserRepositories } from "@/lib/data";
import Repository from "./Repository";

const AddGithubProject = async () => {
  const session = await auth();
  const repos = await getUserRepositories(session?.user.username);
  console.log(repos);
  return (
    <div>
      <div className="text-xl">Import Git Repository</div>
      <UserAvatar username={session?.user.username} />
      <div className="w-1/4 flex flex-col gap-3">
        {repos.map((repo) => (
          <Repository
            repo={repo}
            key={repo.id}
            username={session?.user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default AddGithubProject;
