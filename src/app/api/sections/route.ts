import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sections = await prisma.sectionVisibility.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        active: true
      }
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Error fetching sections" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { name, active } = await request.json();

    const section = await prisma.sectionVisibility.update({
      where: { name },
      data: { active },
      select: {
        id: true,
        name: true,
        active: true
      }
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("Error updating section:", error);
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
        update: {}, // Não atualiza se já existir
        create: {
          name: section.name,
          active: section.active,
        },
      });
    }

    const createdSections = await prisma.sectionVisibility.findMany({
      select: {
        id: true,
        name: true,
        active: true,
      },
    });

    return NextResponse.json(createdSections);
  } catch (error) {
    console.error("Error creating sections:", error);
    return NextResponse.json(
      { error: "Error creating sections" },
      { status: 500 }
    );
  }
}
