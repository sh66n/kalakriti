import { auth } from "@/auth";
import { connectToDb } from "@/lib/connectToDb";
import { Project } from "@/models/project.model";
import { IProject, zProject } from "@/models/project.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, { params }: any): Promise<NextResponse> => {
  try {
    const authSession = await auth();
    if (!authSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // if (!req.auth) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    await connectToDb();
    const { id } = await params;
    const project = await Project.findById(id);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (req, { params }: any): Promise<NextResponse> => {
  try {
    const authSession = await auth();
    if (!authSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // if (!req.auth) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    await connectToDb();
    const { id } = await params;
    const body: IProject = await req.json();
    zProject.parse(body);
    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updatedProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (req, { params }: any): Promise<NextResponse> => {
  try {
    const authSession = await auth();
    if (!authSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // if (!req.auth) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    await connectToDb();
    const { id } = await params;
    const deletedProject = await Project.findByIdAndDelete(id, { new: true });
    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
