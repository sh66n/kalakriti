import { auth } from "@/auth";
import { uploadImage } from "@/lib/cloudinary";
import { connectToDb } from "@/lib/connectToDb";
import { Project } from "@/models/project.model";
import { zProject, IProject } from "@/models/project.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req): Promise<NextResponse> => {
  try {
    // const authSession = await auth();
    // if (!authSession) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // if (!req.auth) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    await connectToDb();
    const allProjects = await Project.find({});
    return NextResponse.json(allProjects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 400 });
  }
};

export const POST = async (req): Promise<NextResponse> => {
  try {
    const authSession = await auth();
    if (!authSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // if (!req.auth) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    await connectToDb();
    const formData = await req.formData();

    const images = formData.getAll("images") as File[];

    const body: any = Object.fromEntries(formData.entries());

    body.images = [];

    for (const image of images) {
      const data: { url: string } = (await uploadImage(image)) as {
        url: string;
      };
      body.images.push(data.url);
    }

    body.author = req.auth.user._id;

    zProject.parse(body);

    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating project", error: error },
      { status: 400 }
    );
  }
};
