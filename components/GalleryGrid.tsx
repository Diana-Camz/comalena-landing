"use client";

import Image from "next/image";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

type GalleryItem = {
  src: string;
  alt: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(item)}
            className="group mb-4 break-inside-avoid relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm"
          >
            <div className="relative w-full">
              <Image
                src={item.src}
                alt={item.alt}
                width={900}
                height={700}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-sm">
                Ver foto
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl bg-black "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-auto w-full h-0 pb-[75%]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-1 top-2 px-1 text-sm cursor-pointer"
            >
              <IoMdCloseCircle size={45} color="#fafafa"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
