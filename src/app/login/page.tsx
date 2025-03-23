import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import React from "react";

const Login = async () => {
  const session = await auth();
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default Login;
