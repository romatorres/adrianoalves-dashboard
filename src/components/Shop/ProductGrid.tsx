"use client";

import { ProductCard } from "./ProductCard";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui-shadcn/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  isVisible?: boolean;
}

export function ProductGrid({
  products = [],
  isVisible = true,
}: ProductGridProps) {
  if (!isVisible) return null;

  return !products || products.length === 0 ? (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-500">
          Nenhum produto disponível
        </div>
      </div>
    </section>
  ) : (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-2 md:px-6">
        <div className="mb-12 md:mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-primary font-normal text-background mb-3">
            Shops
          </h2>
          <div className="relative w-[96px] h-[22px] md:w-[120px] md:h-[28px]">
            <Image
              src="/img/bigode.svg"
              alt="Bigode abaixo do titulo Loja"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Carousel
            className="w-full"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ProductCard product={product} />
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
