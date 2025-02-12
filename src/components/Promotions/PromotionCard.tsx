import Image from "next/image";

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
  // Função simples para formatar a data
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {promotion.imageUrl && (
        <div className="relative h-48">
          <Image
            src={promotion.imageUrl}
            alt={promotion.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{promotion.title}</h3>
        <p className="text-gray-600 mb-4">{promotion.description}</p>
        <div className="text-sm text-gray-500">
          <p>Início: {formatDate(promotion.startDate)}</p>
          <p>Término: {formatDate(promotion.endDate)}</p>
          {promotion.discount && (
            <p className="text-primary font-semibold mt-2">
              Desconto: {promotion.discount * 100}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
