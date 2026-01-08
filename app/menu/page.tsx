import Layout from "@/components/Layout";
import MenuCard from "@/components/MenuCard";
import { pizzasMenu } from "@/components/data/data";

export default function menuPage() {
    return (
        <Layout>
            <section className="py-8">
                <h1 className="font-display lg:text-6xl text-center">Menú de Comaleña Pizza</h1>
                <div className="lg:mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {pizzasMenu.map((pizza, index) => (
                        <MenuCard key={index} {...pizza}/>
                    ))}
                </div>

            </section>
        </Layout>
    )
}