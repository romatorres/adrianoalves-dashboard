import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidateTag } from "next/cache";

interface ServiceError {
  message: string;
}

function serializeService(service: {
  price: Decimal;
  [key: string]: Decimal | string | boolean | Date | number | null;
}) {
  return {
    ...service,
    price: Number(service.price),
  };
}

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });

    const response = NextResponse.json({
      success: true,
      data: services.map(serializeService),
    });

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error: unknown) {
    const serviceError = error as ServiceError;
    console.error("Error fetching services:", serviceError);
    return NextResponse.json(
      { 
        success: false, 
        error: serviceError.message || "Error fetching services" 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const service = await prisma.service.create({
      data: {
        ...data,
        price: new Decimal(data.price),
      },
    });

    const response = NextResponse.json({
      success: true,
      data: serializeService(service),
    });

    revalidateTag("services");
    return response;
  } catch (error: unknown) {
    const serviceError = error as ServiceError;
    console.error("Error creating service:", serviceError);
    return NextResponse.json(
      { 
        success: false, 
        error: serviceError.message || "Error creating service" 
      },
      { status: 500 }
    );
  }
}