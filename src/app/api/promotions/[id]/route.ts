import { NextResponse, NextRequest} from "next/server";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { Promotion } from "@/app/dashboard/promotions/types";

interface PromotionWithDecimal extends Omit<Promotion, "discount"> {
  discount: Decimal | null;
}

function serializePromotion(promotion: PromotionWithDecimal): Promotion {
  return {
    ...promotion,
    discount: promotion.discount ? Number(promotion.discount) : null,
  };
}

export async function GET(
  request: NextRequest,
) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || ''
  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id },
    });

    if (!promotion) {
      return NextResponse.json(
        {
          success: false,
          error: "Promoção não encontrada",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: serializePromotion(promotion),
    });
  } catch (error) {
    console.error("Error fetching promotion:", error);
    return NextResponse.json(
      { error: "Error fetching promotion" },
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
    await prisma.promotion.update({
      where: { id: params.id },
      data,
    });

    // Garantir que as datas sejam convertidas corretamente
    const startDate = data.startDate && new Date(data.startDate);
    const endDate = data.endDate && new Date(data.endDate);

    const updatedPromotion = await prisma.promotion.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        startDate,
        endDate,
        discount: data.discount ? Number(data.discount) : 0,
        active: data.active,
      },
    });

    // Serializar as datas antes de retornar
    return NextResponse.json({
      ...updatedPromotion,
      startDate: updatedPromotion.startDate.toISOString(),
      endDate: updatedPromotion.endDate.toISOString(),
    });
  } catch (error) {
    console.error("Error updating promotion:", error);
    return NextResponse.json(
      { error: "Error updating promotion" },
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
    await prisma.promotion.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting promotion:", error);
    return NextResponse.json(
      { error: "Error deleting promotion" },
      { status: 500 }
    );
  }
}
