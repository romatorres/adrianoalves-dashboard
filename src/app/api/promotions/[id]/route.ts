import { NextResponse } from "next/server";
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
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id: params.id },
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
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const json = await request.json();

    // Garantir que as datas sejam convertidas corretamente
    const startDate = json.startDate && new Date(json.startDate);
    const endDate = json.endDate && new Date(json.endDate);

    const updatedPromotion = await prisma.promotion.update({
      where: { id },
      data: {
        title: json.title,
        description: json.description,
        imageUrl: json.imageUrl,
        startDate,
        endDate,
        discount: json.discount ? Number(json.discount) : 0,
        active: json.active,
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
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.promotion.delete({
      where: { id: params.id },
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
