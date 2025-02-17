import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { id: context.params.id },
    });

    if (!category) {
      return NextResponse.json({
        success: false,
        error: "Categoria não encontrada"
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: category });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Erro ao buscar categoria"
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const category = await prisma.productCategory.update({
      where: { id: context.params.id },
      data
    });

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: "Categoria não encontrada"
      }, { status: 404 });
    }
    return NextResponse.json({
      success: false,
      error: "Erro ao atualizar categoria"
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await prisma.productCategory.delete({
      where: { id: context.params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Categoria excluída com sucesso"
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Erro ao excluir categoria"
    }, { status: 500 });
  }
} 