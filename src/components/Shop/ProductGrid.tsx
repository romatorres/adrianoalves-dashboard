"use client";

import Slider from "react-slick";
import { ProductCard } from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick-custom.css";
import Image from "next/image";

// Tipos movidos para um arquivo separado
interface ProductCategory {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productCategory?: ProductCategory | null;
}

interface ProductGridProps {
  products: Product[];
  isVisible?: boolean;
}

export function ProductGrid({
  products = [],
  isVisible = true,
}: ProductGridProps) {
  if (!isVisible) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return !products || products.length === 0 ? (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-500">
          Nenhum produto disponível
        </div>
      </div>
    </section>
  ) : (
    <section className="py-12 md:py-16 bg-white">
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
          <div className="w-full px-2 slick-container">
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
