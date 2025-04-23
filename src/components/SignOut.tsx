"use client";

import { auth, signOut } from "@/auth";
import { handleSignOut } from "@/lib/signOut";

export function SignOut() {
  return (
    <button
      type="submit"
      className="hover:cursor-pointer"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}
