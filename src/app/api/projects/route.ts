import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("hello");
  return NextResponse.json({ message: "hello there" }, { status: 200 });
};
