import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(
  request: NextRequest,
) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || ''
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id },
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

    

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: image
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: "Imagem não encontrada"
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Erro ao atualizar imagem"
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function DELETE(
  request: Request,
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
      message: "Erro ao deletar imagem"
    }, { status: 500 });
  }
}
