import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function PUT(
  request: NextRequest,
) {
   const { searchParams } = new URL(request.url)
   const id = searchParams.get('id') || ''
  try {
    const { name, description } = await request.json();

    // Verifica se já existe outra categoria com o mesmo nome
    const existingCategory = await prisma.productCategory.findFirst({
      where: {
        name,
        NOT: {
          id: id,
        },
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Já existe uma categoria com este nome" },
        { status: 400 }
      );
    }

    const category = await prisma.productCategory.update({
      where: { id: id },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(category);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Erro ao atualizar categoria" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  
) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || ''
  try {
    // Verifica se existem produtos usando esta categoria
    const productsCount = await prisma.product.count({
      where: { id },
    });

    if (productsCount > 0) {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir esta categoria pois existem produtos vinculados a ela",
        },
        { status: 400 }
      );
    }

    await prisma.productCategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Categoria excluída com sucesso" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Erro ao excluir categoria" },
      { status: 500 }
    );
  }
}
