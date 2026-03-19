
import { FaSquarePlus } from "react-icons/fa6";

export default function AddToCartButton() {
    return (
        <div className="flex w-full justify-end pr-1.5">
            <button 
                type="button"
                onClick={() => alert("producto agregado al carrito")}
                className="text-secondary/90 cursor-pointer"
            >
            <FaSquarePlus 
                className="
                w-9 h-9
                md:w-12 md:h-12
                lg:w-13 lg:h-13"
            />
            </button>
        </div>
    )
}
