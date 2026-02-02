"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { featuredPizzas } from "@/data/data";
import FeatCard from "./FeatCard";

export function FeatCarousel() {
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
      className=" relative items-center
     overflow-hidden rounded-4xl
     "
    >
         <CarouselContent  className=" h-auto items-stretch">
        {featuredPizzas.map((item) => (
          <CarouselItem key={item.id} className=" relative my-2">
              <FeatCard
                key={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                price={item.price}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
