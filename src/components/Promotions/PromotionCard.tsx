import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface PromotionCardProps {
  promotion: {
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    startDate: Date;
    endDate: Date;
    discount: number | null;
  };
}

export function PromotionCard({ promotion }: PromotionCardProps) {
  const getRemainingDays = useMemo(() => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    // Se a promoção ainda não começou, mostra os dias até o início
    if (now < startDate) {
      const diffTime = startDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { days: diffDays, type: "start" };
    }

    // Se a promoção já começou, mostra os dias até o fim
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { days: diffDays, type: "end" };
  }, [promotion.startDate, promotion.endDate]);

  const getPromotionStatus = useMemo(() => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    if (now < startDate) {
      return {
        message: getRemainingDays.days,
        class: "text-yellow-600",
        isCountdown: true,
        countdownType: "start",
        isSingular: getRemainingDays.days === 1,
      };
    }
    if (now > endDate) {
      return {
        message: "Promoção encerrada",
        class: "text-red-600",
      };
    }
    if (getRemainingDays.days === 1) {
      return {
        message: "Último dia!",
        class: "text-red-600 font-bold",
      };
    }
    return {
      message: getRemainingDays.days,
      class: "text-green-700",
      isCountdown: true,
      countdownType: "end",
      isSingular: getRemainingDays.days === 1,
    };
  }, [getRemainingDays, promotion.startDate, promotion.endDate]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {promotion.imageUrl && (
        <div className="relative w-full aspect-square">
          <Image
            src={promotion.imageUrl}
            alt={promotion.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-2">{promotion.title}</h3>
        <p className="text-gray-01 mb-4">{promotion.description}</p>
        <div className="text-sm text-gray-03">
          <div className={`${getPromotionStatus.class}`}>
            {getPromotionStatus.isCountdown ? (
              <div className="flex items-center justify-center">
                <p className="text-gray-01 text-sm">
                  {getPromotionStatus.countdownType === "start"
                    ? getPromotionStatus.isSingular
                      ? "Falta"
                      : "Faltam"
                    : "Restam"}
                </p>
                <div className="bg-gradient-to-b from-white to-white rounded-lg px-2 py-1 mx-1 shadow-sm border">
                  <span className="font-bold text-3xl tabular-nums">
                    {getPromotionStatus.message}
                  </span>
                  <span className="text-sm font-medium ml-1">
                    {getPromotionStatus.isSingular ? "DIA" : "DIAS"}
                  </span>
                </div>
                <p className="text-gray-01 text-sm">
                  {getPromotionStatus.countdownType === "start"
                    ? "para início da promoção"
                    : "para o fim da promoção"}
                </p>
              </div>
            ) : (
              <p className="text-center text-lg font-medium">
                {getPromotionStatus.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center mt-6">
            {promotion.discount && (
              <div className="bg-background rounded-lg px-3 py-1">
                <p className="text-primary font-bold text-2xl flex items-center">
                  {promotion.discount}%
                  <span className="text-sm font-semibold ml-1">OFF</span>
                </p>
              </div>
            )}
            <Link href="https://wa.me/75988460046" target="_blank">
              <button className="bg-primary hover:bg-black_secondary font-medium text-background hover:text-white text-sm py-3 px-6 rounded-full transition-colors duration-300">
                Consultar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
