import { auth } from "@/auth";
import { connectToDb } from "@/lib/connectToDb";
import { Project } from "@/models/project.model";
import { IProject, zProject } from "@/models/project.schema";
import { NextRequest, NextResponse } from "next/server";

// Create route handlers without the auth wrapper first
async function getHandler(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();
    const id = params.id;
    const project = await Project.findById(id);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

async function patchHandler(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();
    const id = params.id;
    const body: IProject = await req.json();
    zProject.parse(body);
    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updatedProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

async function deleteHandler(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();
    const id = params.id;
    const deletedProject = await Project.findByIdAndDelete(id, { new: true });
    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

// Then apply the auth middleware and add authorization check
export const GET = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return getHandler(req, ctx);
});

export const PATCH = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return patchHandler(req, ctx);
});

export const DELETE = auth(async (req, ctx) => {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return deleteHandler(req, ctx);
});
