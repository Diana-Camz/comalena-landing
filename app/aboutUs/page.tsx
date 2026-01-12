import Layout from "@/components/Layout";
import Image from "next/image";

export default function aboutUsPage() {
    return (
        <Layout>
          <section className="py-10 text-center lg:px-80">
            <h1 className="lg:mt-2 lg:text-2xl font-medium text-foreground/80">
                Un poco de nuestra historia.
            </h1>
            <div className="flex mt-4 rounded-xl items-center bg-sidebar-ring/5">
                <div  className="sm:w-1/2 w-full  md:w-10/12  aspect-square relative">
                    <Image src="/images/aboutUs/image-about-4_1.webp" alt="Equipo de Comalena" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg "/>
                </div>
                <p className="lg:mt-4 lg:text-lg text-foreground/80 px-4">
                    En Comaleña, nuestra historia comienza con una pasión compartida por la pizza artesanal y el deseo de ofrecer a nuestra comunidad una experiencia culinaria única. 
                </p>
            </div>
            <div className="flex mt-4 rounded-xl items-center bg-sidebar-ring/5">
                <p className="lg:mt-4 lg:text-lg text-foreground/80 px-4">
                    Fundada en 2022 por un grupo de amigos amantes de la buena comida, Comaleña nació de la idea de combinar ingredientes frescos y técnicas tradicionales para crear pizzas que no solo satisfacen el paladar, sino que también cuentan una historia en cada rebanada.
                </p>
                 <div  className="sm:w-1/2 w-full  md:w-380  aspect-square relative">
                    <Image src="/images/aboutUs/image-about-2_1.webp" alt="Equipo de Comalena" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg"/>
                </div>
            </div>
            <div className="flex mt-4 rounded-xl items-center bg-sidebar-ring/5">
                <div className="sm:w-1/2 w-full  md:w-175  aspect-square relative">
                    <Image src="/images/aboutUs/image-about.jpg" alt="Equipo de Comalena" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg"/>
                </div>
                
                <p className="lg:mt-4 lg:text-lg text-foreground/80 px-4 mb-4">
                    Cada pizza que sale de nuestro horno es el resultado de dedicación, creatividad y un amor profundo por lo que hacemos.
                </p>
            </div>
          </section>
        </Layout>
    )
}