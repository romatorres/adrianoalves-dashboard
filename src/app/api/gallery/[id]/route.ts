import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id: params.id },
    });

    if (!image) {
      return NextResponse.json({
        success: false,
        error: "Imagem não encontrada"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: image
    });
  } catch (error) {
    console.error("Erro ao buscar imagem:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao buscar imagem"
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const image = await prisma.galleryImage.update({
      where: { id: params.id },
      data: {
        ...data,
        active: data.active === true || data.active === 'true',
      },
    });

    return NextResponse.json({
      success: true,
      data: image
    });
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao atualizar imagem"
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.galleryImage.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Imagem deletada com sucesso"
    });
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao deletar imagem"
    }, { status: 500 });
  }
}
