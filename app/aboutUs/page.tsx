import Layout from "@/components/Layout";
import Image from "next/image";

export default function aboutUsPage() {
    return (
        <Layout>
          <section className="py-10 text-center min-[1025px]:px-16 max-w-[1300px] mx-auto">
            <h1 className="lg:mt-2 md:text-5xl text-3xl min-[560px]:text-4xl font-medium text-secondary/70 tracking-wide">
                Un poco de nuestra historia.
            </h1>
            <div className="flex flex-col p-4 gap-6  min-[1025px]:flex-row mt-6 rounded-xl min-[600px]:items-center bg-sidebar-ring/5">
                <div  className="w-full min-[600px]:w-[480px] aspect-square relative shrink-0">
                    <Image src="/images/aboutUs/image-about-4_1.webp" alt="Comalena" fill sizes="(max-width: 600px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg "/>
                </div>
                <div>
                <h3 className="lg:mt-2 lg:text-4xl text-2xl  min-[560px]:text-3xl text-card-foreground/90 font-medium">EL COMIENZO DE ALGO IRRESISTIBLE</h3>
                <p className="lg:mt-4 text-md min-[560px]:text-xl lg:text-2xl font-gothic text-card-foreground/60 px-4">
                    Somos una familia con una pasión compartida por la pizza artesanal y el deseo de ofrecer a Comala una experiencia única. 
                </p>
                </div>
            </div>
            <div className="flex flex-col p-4 gap-6 lg:flex-row-reverse mt-6 rounded-xl min-[600px]:items-center bg-sidebar-ring/5">
                <div  className="w-full min-[600px]:w-[480px] aspect-square relative shrink-0">
                    <Image src="/images/aboutUs/image-about-2_1.webp" alt="Ingredientes frescos" fill sizes="(max-width: 600px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg"/>
                </div>
                <div>
                    <h3 className="lg:mt-2 lg:text-4xl text-2xl  min-[560px]:text-3xl text-card-foreground/90 font-medium">UN SUENO CUMPLIDO</h3>
                    <p className="lg:mt-4 text-md min-[560px]:text-xl lg:text-2xl font-gothic text-card-foreground/60 px-4">
                    Desde 2024 decidimos crear una pizza tan deliciosa que fuera imposible no comer otra rebanada, Comaleña nació de la idea de combinar los mejores ingredientes y técnicas unicas para crear pizzas irresistibles.
                    </p>
                </div>  
            </div>
            <div className="flex flex-col p-4 gap-6 lg:flex-row mt-6 rounded-xl min-[600px]:items-center bg-sidebar-ring/5">
                <div className="w-full min-[600px]:w-[480px] aspect-square relative shrink-0">
                    <Image src="/images/aboutUs/image-about.jpg" alt="Pizzas al horno" fill sizes="(max-width: 600px) 100vw, 50vw" className="object-cover rounded-xl shadow-lg"/>
                </div>
                <div>
                    <h3 className="lg:mt-2 lg:text-4xl text-2xl min-[560px]:text-3xl text-card-foreground/90 font-medium">NO ES SOLO PIZZA</h3>
                    <p className="lg:mt-4 text-md min-[560px]:text-xl lg:text-2xl font-gothic text-card-foreground/60 px-4 mb-4">
                        Cada pizza que sale de nuestro horno es el resultado de dedicación, creatividad y un amor profundo por lo que hacemos.
                    </p>
                </div>
            </div>
          </section>
        </Layout>
    )
}