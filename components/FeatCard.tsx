import Image from "next/image";

type FeatCardProps = { title: string; description: string; imageUrl: string; price: string }

export default function FeatCard({ title, description, imageUrl, price }: FeatCardProps) {
    return (
        <article className="h-full group flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-background active:scale-[0.98] hover:-translate-y-1">
            <Image
                src={imageUrl}
                alt={title}
                className="h-44 w-lg object-cover"
                width={250}
                height={250}
            />
            <div className="p-5">
                <h4 className="inline-block text-4xl text-card-foreground/80 ">{title}</h4>
                <p className="mt-2 text-md lg:text-xl text-card-foreground/50 font-gothic line-clamp-3">
                    {description}
                </p>
                <div className="md:mt-6 flex items-center justify-end">
                    {/* <span className="font-display text-5xl">{price}</span> */}
                </div>
            </div>
        </article>

    );
}