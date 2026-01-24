import Layout from "@/components/Layout";
import GalleryGrid from "@/components/GalleryGrid";

const galleryItems = [
  { src: "/images/gallery/gallery_1.webp", alt: "Horno y preparación" },
  { src: "/images/gallery/gallery-4.webp", alt: "Mesa con pizzas" },
  { src: "/images/gallery/gallery-8.webp", alt: "Pizza pepperoni" },
  { src: "/images/gallery/gallery_3.webp", alt: "Horno y preparación" },
  { src: "/images/gallery/gallery-10.webp", alt: "Mesa con pizzas" },
  { src: "/images/gallery/gallery-7.webp", alt: "Mesa con pizzas" },
  { src: "/images/gallery/gallery-5.webp", alt: "Pizza pepperoni" },
  { src: "/images/gallery/gallery-12_2.webp", alt: "Mesa con pizzas" },
  { src: "/images/gallery/gallery-13_2.webp", alt: "Mesa con pizzas" },
  { src: "/images/gallery/gallery-2.webp", alt: "Pizza pepperoni" },
  { src: "/images/gallery/gallery-14_2.webp", alt: "Mesa con pizzas" },
  { src: "/images/gallery/gallery-9.webp", alt: "Horno y preparación" },
  { src: "/images/gallery/gallery-11.webp", alt: "Mesa con pizzas" },
];

export default function GaleriaPage() {
  return (
    <Layout>
      <section className="py-10 text-center">
        <h1 className="lg:mt-2 font-medium lg:text-3xl text-red/80 ">
          Un vistazo al sabor de Comaleña: pizzas, horno y momentos.
        </h1>

        <div className="mt-8">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </Layout>
  );
}