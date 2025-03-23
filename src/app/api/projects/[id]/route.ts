import { auth } from "@/auth";
import { connectToDb } from "@/lib/connectToDb";
import { IProject, Project, zProject } from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: any
): Promise<NextResponse> => {
  try {
    await connectToDb();
    const { id } = await params;
    const project = await Project.findById(id);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: any
): Promise<NextResponse> => {
  try {
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

export const DELETE = async (
  req: NextRequest,
  { params }: any
): Promise<NextResponse> => {
  try {
    await connectToDb();
    const { id } = await params;
    const deletedProject = await Project.findByIdAndDelete(id, { new: true });
    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
