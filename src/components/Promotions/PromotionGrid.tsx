import { Promotion } from "@/app/dashboard/promotions/types";
import { PromotionCard } from "./PromotionCard";
import Image from "next/image";

interface PromotionGridProps {
  promotions: Promotion[];
  isVisible?: boolean;
}

export function PromotionGrid({
  promotions,
  isVisible = true,
}: PromotionGridProps) {
  if (!isVisible) return null;
  return (
    <section className="py-12 md:py-16 bg-service bg-cover bg-center bg-no-repeat">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-20 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-primary font-normal text-black_secondary mb-3">
            Promoções
          </h2>
          <div className="relative w-[96px] h-[22px] md:w-[120px] md:h-[28px]">
            <Image
              src="/img/bigode.svg"
              alt="Bigode abaixo do titulo Serviços"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => (
            <PromotionCard key={promotion.id} promotion={promotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
