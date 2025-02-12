import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { id: params.id },
    });

    if (!category) {
      return NextResponse.json({
        success: false,
        error: "Categoria não encontrada"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao buscar categoria"
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const category = await prisma.productCategory.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({
          success: false,
          error: "Categoria não encontrada"
        }, { status: 404 });
      }
    }

    return NextResponse.json({
      success: false,
      error: "Erro ao atualizar categoria"
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.productCategory.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Categoria excluída com sucesso"
    });
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao excluir categoria"
    }, { status: 500 });
  }
} 