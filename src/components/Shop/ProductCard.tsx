"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productCategory?: {
    id: string;
    name: string;
  } | null;
}

export function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <div className="mx-2 rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-04">
      <div className="p-2">
        <div className="relative h-56">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="px-3 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="flex justify-between items-center px-3 pt-4 pb-3">
        <span className="inline-block text-2xl font-bold text-background">
          {formattedPrice}
        </span>
        <Link href="https://wa.me/75988460046" target="_blank">
          <button className="bg-primary hover:bg-black_secondary text-background hover:text-white text-sm py-2 px-4 rounded-full transition-colors duration-300">
            Consultar
          </button>
        </Link>
      </div>
    </div>
  );
}
