'use client';
import Image from "next/image";
import { HeroCarousel } from "./HeroCarousel";

export function Hero () {
    return (
        // <div className="w-full min-[600px]:w-full relative mt-8 
        // aspect-square
        // md:aspect-[16/9]     
        // lg:aspect-[25/9] shrink-0 overflow-hidden">
        //     <Image src="/images/margarita.jpg" alt="Hero Image Comaleña Pizza" fill sizes="(max-width: 600px) 100vw, 1000px"  className="rounded-4xl object-cover" priority/>
        // </div>
        <HeroCarousel />
    )
}