
type TestimonialCardProps = {
    client: string;
    testimonial: string;
    rate: number;
    date: string;
}

export default function TestimonialCard({client, testimonial, rate, date}:TestimonialCardProps) {

    let stars;
    switch (rate) {

        case 1:
        stars = "★";
        break;

        case 2:
        stars = "★★";
        break;

        case 3:
        stars = "★★★";
        break;

        case 4:
        stars = "★★★★";
        break;

        case 5:
         stars = "★★★★★";
        break;

        default:
         stars = "★★★★★";
            break;
    }
    
    return (
        <article className="group flex rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-background active:scale-[0.98] hover:-translate-y-1">
            <div className="p-5 flex flex-col justify-between w-full">
                <h4 className="inline-block text-3xl text-red">{client}</h4>
                <div className="h-50%" >
                    <p tabIndex={0} className="mt-2 text-md lg:text-xl text-card-foreground/70 font-gothic line-clamp-3">
                    {testimonial}
                    </p>
                </div>
                <div className="md:mb-0 flex items-center justify-end md:mt-4">
                    <span className="text-3xl text-thirdary">{stars}</span>
                </div>
            </div>
        </article>
);
}