import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Decimal } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

function serializeProduct(product: {
  price: Decimal;
  [key: string]: Decimal | string | boolean | Date | number | null;
}) {
  return {
    ...product,
    price: Number(product.price),
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({
        success: false,
        error: "Produto não encontrado"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: serializeProduct(product)
    });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao buscar produto"
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...data,
        price: data.price ? new Decimal(data.price) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      data: serializeProduct(product)
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({
          success: false,
          error: "Produto não encontrado"
        }, { status: 404 });
      }
    }

    return NextResponse.json({
      success: false,
      error: "Erro ao atualizar produto"
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Produto excluído com sucesso"
    });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao excluir produto"
    }, { status: 500 });
  }
}
