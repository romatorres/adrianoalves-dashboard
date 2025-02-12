"use client";

import Image from "next/image";

interface GalleryImage {
  id: string;
  title: string | null;
  imageUrl: string;
  description: string | null;
}

interface GalleryCardProps {
  image: GalleryImage;
  isLoaded: boolean;
  onLoad: (imageId: string) => void;
  onClick: () => void;
}

export function GalleryCard({
  image,
  isLoaded,
  onLoad,
  onClick,
}: GalleryCardProps) {
  return (
    <div
      className="group overflow-hidden rounded-lg shadow-lg relative cursor-pointer h-[300px]"
      onClick={onClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <div className="relative w-full h-full">
        <Image
          src={image.imageUrl}
          alt={image.title || "Imagem da galeria"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => onLoad(image.id)}
        />
        {(image.title || image.description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {image.title && <h3 className="font-semibold">{image.title}</h3>}
            {image.description && (
              <p className="text-sm mt-1">{image.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
