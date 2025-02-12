import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Decimal } from "@prisma/client/runtime/library";
import { Service } from "@/app/dashboard/services/types";

interface ServiceWithDecimal extends Omit<Service, 'price'> {
  price: Decimal;
}

function serializeService(service: ServiceWithDecimal): Service {
  return {
    ...service,
    price: Number(service.price),
  };
}

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services.map(serializeService));
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Error fetching services" },
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
    return NextResponse.json(serializeService(service));
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Error creating service" },
      { status: 500 }
    );
  }
}