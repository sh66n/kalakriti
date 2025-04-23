import { auth } from "@/auth";
import { connectToDb } from "@/lib/connectToDb";
import { Project } from "@/models/project.model";
import { IProject, zProject } from "@/models/project.schema";
import { NextRequest, NextResponse } from "next/server";

// Next.js 15 expects this specific function signature for route handlers
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();
    const { id } = context.params;
    const project = await Project.findById(id);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();
    const { id } = context.params;
    const body: IProject = await request.json();
    zProject.parse(body);
    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updatedProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();
    const { id } = context.params;
    const deletedProject = await Project.findByIdAndDelete(id, { new: true });
    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
