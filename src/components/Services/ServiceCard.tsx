"use client";

import Image from "next/image";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  duration: number;
}

export function ServiceCard({ service }: { service: Service }) {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <section className="mx-2 rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-04">
      <div className="p-2">
        <div className="relative h-56 w-full">
          <Image
            src={service.imageUrl || ""}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-secondary font-semibold mb-2">
            {service.name}
          </h3>
          {service.description && (
            <p className="text-gray-700 font-tertiary mb-4">
              {service.description}
            </p>
          )}
          {service.duration && (
            <p className="text-gray-700 font-tertiary mb-4">
              {service.duration} minutos
            </p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-2xl font-quaternary font-bold text-background">
              {formattedPrice(service.price)}
            </span>
            <Link href="https://avec.app/adrianoalves/" target="_blank">
              <button className="bg-primary hover:bg-black_secondary text-background hover:text-white text-sm py-2 px-4 rounded-full transition-colors duration-300 font-tertiary">
                Agendar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
