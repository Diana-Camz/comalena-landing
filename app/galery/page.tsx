import Layout from "@/components/Layout";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryItems } from "@/data/data";

export default function GaleriaPage() {
  return (
    <Layout>
      <section className="py-10 text-center">
        <h1 className="lg:mt-2 font-medium text-lg sm:text-2xl lg:text-3xl text-red/80 ">
          Un vistazo al sabor de Comaleña: pizzas, horno y momentos.
        </h1>

        <div className="mt-8">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </Layout>
  );
}