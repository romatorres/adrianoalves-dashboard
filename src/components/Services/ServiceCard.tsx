"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  duration: number;
}

interface ServiceCardProps {
  services: Service[];
  isVisible?: boolean;
}

export function ServiceCard({
  services = [],
  isVisible = true,
}: ServiceCardProps) {
  if (!isVisible || !services.length) {
    return null;
  }

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <section className="py-10 md:py-12 lg:py-16 bg-secondary">
      <div className="max-w-[1280px] mx-auto px-3 md:px-6">
        <div className="mb-8 md:mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-primary font-normal text-black_secondary mb-3">
            Serviços
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

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {services.map((service) => (
                <CarouselItem
                  key={service.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="bg-gray-04 rounded-lg shadow-lg overflow-hidden h-full">
                    <div className="relative h-[150px]">
                      <Image
                        src={service.imageUrl || "/img/default-service.jpg"}
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
                        <Link
                          href="https://avec.app/adrianoalves/"
                          target="_blank"
                        >
                          <button className="bg-primary hover:bg-black_secondary text-background hover:text-white text-sm py-2 px-4 rounded-full transition-colors duration-300 font-tertiary">
                            Agendar
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
