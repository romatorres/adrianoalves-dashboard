"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "../ImageModal/ImageModal";
import { GalleryCard } from "./GalleryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui-shadcn/carousel";
import Autoplay from "embla-carousel-autoplay";

interface GalleryImage {
  id: string;
  title: string | null;
  imageUrl: string;
  description: string | null;
}

interface GalleryGridProps {
  images: GalleryImage[];
  isVisible?: boolean;
}

export function GalleryGrid({
  images = [],
  isVisible = true,
}: GalleryGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  if (!isVisible || !images.length) {
    return null;
  }

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-3 md:px-6">
        <div className="mb-8 md:mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-primary font-normal text-black_secondary mb-3">
            Galeria
          </h2>
          <div className="relative w-[96px] h-[22px] md:w-[120px] md:h-[28px]">
            <Image
              src="/img/bigode.svg"
              alt="Bigode abaixo do titulo Galeria"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="gallery-slider">
          <Carousel
            className="w-full"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => (
                <CarouselItem
                  key={image.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <GalleryCard
                    image={image}
                    isLoaded={loadedImages.has(image.id)}
                    onLoad={handleImageLoad}
                    onClick={() => handleImageClick(index)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {selectedImageIndex !== null && (
          <ImageModal
            images={images}
            currentImageIndex={selectedImageIndex}
            onClose={handleCloseModal}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
          />
        )}
      </div>
    </section>
  );
}
