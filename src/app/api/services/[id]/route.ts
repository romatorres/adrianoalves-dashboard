import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidateTag } from "next/cache";

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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Serviço não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: serializeService(service),
    });
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao buscar serviço" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
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

    const response = NextResponse.json({
      success: true,
      data: serializeService(service),
    });

    revalidateTag("services");
    return response;
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao atualizar serviço" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: params.id },
    });

    const response = NextResponse.json({
      success: true,
      message: "Serviço excluído com sucesso",
    });

    revalidateTag("services");
    return response;
  } catch (error) {
    console.error("Erro ao excluir serviço:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao excluir serviço" },
      { status: 500 }
    );
  }
}
