import { prisma } from "@/lib/prisma";
import PromotionManager from "./components/PromotionManager";
import { Decimal } from "@prisma/client/runtime/library";
import { Promotion } from "./types";

interface PromotionWithDecimal extends Omit<Promotion, "discount"> {
  discount: Decimal | null;
}

function serializePromotion(promotion: PromotionWithDecimal): Promotion {
  return {
    ...promotion,
    discount: promotion.discount ? Number(promotion.discount) : null,
  };
}

export default async function PromotionsPage() {
  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Serializa as promoções antes de passar para o componente cliente
  const serializedPromotions = promotions.map(serializePromotion);

  return <PromotionManager initialPromotions={serializedPromotions} />;
}
