import Image from "next/image";

type MenuCardProps = {
  id: number;
  title: string;
  ingredients: string;
  imageUrl: string;
  prices: string[];
  tags?: string[];
}

export default function MenuCard({id, title, ingredients, imageUrl, prices, tags}: MenuCardProps) {
  return (
    <div className="flex border justify-start p-3 items-center rounded-lg hover:shadow-md hover:bg-ring/5 transition-shadow duration-200 ease-in-out ">
      <div className="">
        <Image src={imageUrl} alt={title} width={100} height={100} className="rounded-lg object-cover h-36 w-44"/>
      </div>
      <div className="w-110">
        <h3 className="font-display text-2xl ml-4">{title}</h3>
        <p className="text-foreground/80 mt-2 ml-4">{ingredients}</p>
        <div className="flex w-50 justify-between mt-4 ml-4">
          {prices.map((price, index) => (
            <span key={index} className="text-xl">{price}</span>
          ))}
        </div>
      </div>
    </div>
  )}