import { auth } from "@/auth";
import { connectToDb } from "@/lib/connectToDb";
import { Project } from "@/models/project.model";
import { zProject, IProject } from "@/models/project.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(async (req): Promise<NextResponse> => {
  try {
    if (!req.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectToDb();
    const allProjects = await Project.find({});
    return NextResponse.json(allProjects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 400 });
  }
});

export const POST = auth(async (req): Promise<NextResponse> => {
  try {
    if (!req.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectToDb();
    console.log("check 1");
    const body: IProject = await req.json();
    console.log("check 2");
    zProject.parse(body);
    console.log("check 3");
    const newProject = new Project(body);
    newProject.save();
    console.log("check 4");
    return NextResponse.json(newProject, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json(error, { status: 400 });
  }
});
