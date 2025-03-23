import { auth } from "@/auth";
import { connectToDb } from "@/lib/connectToDb";
import { IProject, Project, zProject } from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req): Promise<NextResponse> => {
  try {
    await connectToDb();
    const allProjects = await Project.find({});
    return NextResponse.json(allProjects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 400 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDb();
    const body: IProject = await req.json();
    zProject.parse(body);
    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json(error, { status: 400 });
  }
};
