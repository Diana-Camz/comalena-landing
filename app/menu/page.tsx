import Layout from "@/components/Layout";
import MenuCard from "@/components/MenuCard";
import { pizzasMenu } from "@/components/data/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import Image from "next/image";

export default function menuPage() {
    return (
        <Layout>
            <section className="py-8">
                <div className="flex justify-evenly">
                    <div className="flex justify-center items-center flex-col mb-8">
                        <p className="font-display lg:text-4xl ">Conoce nuestros tamanos</p>
                    <Image src='/images/tamanos-pizza.jpg' alt='tamanos de pizza' width={600} height={100} className="border rounded-lg object-covermb-8"/>
                    </div>
                    <div className="flex items-center flex-col mb-8">
                        <p className="font-display lg:text-4xl ">Filtra segun tu antojo</p>
                        <div className="gap-4 grid grid-cols-3 items-center mt-4">
                            <div className="">
                                <Checkbox id="terms" />
                                <span className="lg:ml-2 text-xl">Todas</span>
                            </div>
                            <div>
                                <Checkbox id="terms" />
                                <span className="lg:ml-2 text-xl">Especialidades</span>
                            </div>
                            <div>
                                <Checkbox id="terms" />
                                <span className="lg:ml-2 text-xl">Frijoles</span>
                            </div>
                            <div>
                                <Checkbox id="terms" />
                                <span className="lg:ml-2 text-xl">Picosas</span>
                            </div>
                            <div>
                                <Checkbox id="terms" />
                                <span className="lg:ml-2 text-xl">Vegetarianas</span>
                            </div>
                            <div>
                                <Checkbox id="terms" />
                                <span className="lg:ml-2 text-xl">Las mas pedidas</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {pizzasMenu.map((pizza, index) => (
                        <MenuCard key={index} {...pizza}/>
                    ))}
                </div>

            </section>
        </Layout>
    )
}