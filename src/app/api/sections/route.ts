import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sections = await prisma.sectionVisibility.findMany();
    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching sections" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { name, active } = await request.json();
    const section = await prisma.sectionVisibility.upsert({
      where: { name },
      update: { active },
      create: { name, active },
    });
    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating section" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const sections = [
      { name: "gallery", active: true },
      { name: "products", active: true },
      { name: "promotions", active: true },
      { name: "services", active: true },
      { name: "team", active: true },
    ];

    for (const section of sections) {
      await prisma.sectionVisibility.upsert({
        where: { name: section.name },
        update: {},
        create: section,
      });
    }

    const createdSections = await prisma.sectionVisibility.findMany();
    return NextResponse.json(createdSections);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating sections" },
      { status: 500 }
    );
  }
}
