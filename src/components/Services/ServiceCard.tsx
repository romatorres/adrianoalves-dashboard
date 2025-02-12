"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./service-custom.css";
import Link from "next/link";

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

        <div className="service-slider">
          <Slider {...settings}>
            {services.map((service) => (
              <div key={service.id} className="px-2">
                <div className="bg-gray-04 rounded-lg shadow-lg overflow-hidden h-auto">
                  <div className="relative h-[150px]">
                    <Image
                      src={service.imageUrl || "/img/default-service.jpg"}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.name}
                    </h3>
                    {service.description && (
                      <p className="text-gray-700 mb-4">
                        {service.description}
                      </p>
                    )}
                    {service.duration && (
                      <p className="text-gray-700 mb-4">
                        {service.duration} minutos
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-background">
                        {formattedPrice(service.price)}
                      </span>
                      <Link
                        href="https://avec.app/adrianoalves/"
                        target="_blank"
                      >
                        <button className="bg-primary hover:bg-black_secondary text-background hover:text-white text-sm py-2 px-4 rounded-full transition-colors duration-300">
                          Agendar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
