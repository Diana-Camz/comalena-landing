import Layout from "@/components/Layout";
import Image from "next/image";

export default function aboutUsPage() {
    return (
        <Layout>
          <section className="py-10 text-center lg:px-80">
            <h1 className="lg:mt-2 lg:text-6xl font-medium  text-secondary font-display">
                Un poco de nuestra historia.
            </h1>
            <div className="flex flex-col p-4 gap-6 lg:flex-row mt-6 rounded-xl lg:items-center bg-sidebar-ring/5">
                <div  className="w-full lg:w-[420px] aspect-square relative shrink-0">
                    <Image src="/images/aboutUs/image-about-4_1.webp" alt="Comalena" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg "/>
                </div>
                <div>
                <h3 className="lg:mt-2 lg:text-4xl text-card-foreground/90 font-medium">EL COMIENZO DE ALGO IRRESISTIBLE</h3>
                <p className="lg:mt-4 lg:text-2xl font-gothic text-card-foreground/60 px-4">
                    Somos una familia con una pasión compartida por la pizza artesanal y el deseo de ofrecer a Comala una experiencia única. 
                </p>
                </div>
            </div>
            <div className="flex flex-col p-4 gap-6 lg:flex-row-reverse mt-6 rounded-xl lg:items-center bg-sidebar-ring/5">
                <div  className="w-full lg:w-[420px] aspect-square relative shrink-0">
                    <Image src="/images/aboutUs/image-about-2_1.webp" alt="Ingredientes frescos" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg"/>
                </div>
                <div>
                    <h3 className="lg:mt-2 lg:text-4xl text-card-foreground/90 font-medium">UN SUENO CUMPLIDO</h3>
                    <p className="lg:mt-4 lg:text-2xl font-gothic text-card-foreground/60 px-4">
                    Desde 2024 decidimos crear una pizza tan deliciosa que fuera imposible no comer otra rebanada, Comaleña nació de la idea de combinar los mejores ingredientes y técnicas unicas para crear pizzas irresistibles.
                    </p>
                </div>  
            </div>
            <div className="flex flex-col p-4 gap-6 lg:flex-row mt-6 rounded-xl lg:items-center bg-sidebar-ring/5">
                <div className="w-full lg:w-[420px] aspect-square relative shrink-0">
                    <Image src="/images/aboutUs/image-about.jpg" alt="Pizzas al horno" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg"/>
                </div>
                <div>
                    <h3 className="lg:mt-2 lg:text-4xl text-card-foreground/90 font-medium">NO ES SOLO PIZZA</h3>
                    <p className="lg:mt-4 lg:text-2xl font-gothic text-card-foreground/60 px-4 mb-4">
                        Cada pizza que sale de nuestro horno es el resultado de dedicación, creatividad y un amor profundo por lo que hacemos.
                    </p>
                </div>
            </div>
          </section>
        </Layout>
    )
}