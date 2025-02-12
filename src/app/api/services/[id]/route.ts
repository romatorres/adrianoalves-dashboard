import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Decimal } from "@prisma/client/runtime/library";

function serializeService(service: {
  price: Decimal;
  [key: string]: Decimal | string | boolean | Date | number | null;
}) {
  return {
    ...service,
    price: Number(service.price),
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeService(service));
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Error fetching service" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        ...data,
        price: new Decimal(data.price),
      },
    });

    return NextResponse.json(serializeService(service));
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Error updating service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Error deleting service" },
      { status: 500 }
    );
  }
} 