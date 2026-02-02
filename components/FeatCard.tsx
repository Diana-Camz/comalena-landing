import Image from "next/image";

type FeatCardProps = { title: string; description: string; imageUrl: string; price: string }

export default function FeatCard({ title, description, imageUrl, price }: FeatCardProps) {
    return (
        <article className="mx-auto
            w-full max-w-[320px] md:max-w-[400px] lg:max-w-none
            group flex flex-col
            rounded-2xl bg-white
            shadow-sm ring-1 ring-black/5
            overflow-hidden
            transition-all duration-300 ease-out
            hover:scale-[1.03] hover:bg-background
            active:scale-[0.98] hover:-translate-y-1"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 280vw,  (max-width: 768px) 320px, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            </div>
            <div className="p-3 lg:p-5 text-center md:text-start">
                <h4 className="inline-block text-center text-2xl md:text-4xl text-card-foreground/80 ">{title}</h4>
                <p className="md:mt-2 
                text-[clamp(0.80rem,3.1vw,1.2rem)]  
                min-[731px]:text-[clamp(1.2rem,1vw,1.3rem)] 
                min-[1000px]:text-[clamp(1.3rem,1vw,1.5rem)] text-card-foreground/50 font-gothic line-clamp-3">
                    {description}
                </p>
                <div className="md:mt-6 flex items-center justify-end">
                    {/* <span className="font-display text-5xl">{price}</span> */}
                </div>
            </div>
        </article>

    );
}