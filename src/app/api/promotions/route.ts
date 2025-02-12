import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { Promotion } from "@/app/dashboard/promotions/types";

interface PromotionWithDecimal extends Omit<Promotion, 'discount'> {
  discount: Decimal | null;
}

function serializePromotion(promotion: PromotionWithDecimal): Promotion {
  return {
    ...promotion,
    discount: promotion.discount ? Number(promotion.discount) : null,
  };
}

export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(promotions.map(serializePromotion));
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return NextResponse.json(
      { error: "Error fetching promotions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const promotion = await prisma.promotion.create({
      data: {
        ...data,
        discount: data.discount ? Number(data.discount) : null,
      },
    });
    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Error creating promotion:", error);
    return NextResponse.json(
      { error: "Error creating promotion" },
      { status: 500 }
    );
  }
}
