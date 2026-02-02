"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function HeroCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: false,
        }),
      ]}
      className=" relative
        w-full mt-6 overflow-hidden rounded-4xl
        aspect-square md:aspect-[16/9] lg:aspect-[25/9]
      "
    >
         <CarouselContent  className="h-full items-stretch">
        {[
          { src: "/images/hero/hero-1.webp", alt: "Pizza Margarita" },
          { src: "/images/hero/hero-5_1.webp", alt: "Pizza Pepperoni" },
          { src: "/images/hero/hero-3_2.webp", alt: "Pizza Hawaiana" },
          { src: "/images/hero/hero-2.webp", alt: "Pizza Hawaiana" },
          { src: "/images/hero/hero-4_1.webp", alt: "Pizza Hawaiana" },
        ].map((img) => (
          <CarouselItem key={img.src} className="h-full relative">
            <div className="relative w-full h-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 2200px"
                className="object-cover rounded-4xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
