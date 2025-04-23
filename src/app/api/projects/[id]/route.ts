import { auth } from "@/auth";
import { connectToDb } from "@/lib/connectToDb";
import { Project } from "@/models/project.model";
import { IProject, zProject } from "@/models/project.schema";
import { NextRequest, NextResponse } from "next/server";

// Define proper types for the parameters
type Params = {
  params: {
    id: string;
  };
};

export const GET = auth(async (req: NextRequest, context: Params) => {
  try {
    if (!req.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectToDb();
    const { id } = context.params;
    const project = await Project.findById(id);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
});

export const PATCH = auth(async (req: NextRequest, context: Params) => {
  try {
    if (!req.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectToDb();
    const { id } = context.params;
    const body: IProject = await req.json();
    zProject.parse(body);
    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updatedProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
});

export const DELETE = auth(async (req: NextRequest, context: Params) => {
  try {
    if (!req.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectToDb();
    const { id } = context.params;
    const deletedProject = await Project.findByIdAndDelete(id, { new: true });
    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
});
