import { useCart } from "@/context/CartContext"
import { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import PrivacyAdvertisment from "./PrivacyAdv";
import { useBusinessStatus } from "@/hooks/useBusinessStatus";

export default function CustomerForm () {
    const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false);
    const [isActivePrivacy, setIsActivePrivacy] = useState(false);
    const {customerInfo, setCustomerField} = useCart();
    const {isOpen} = useBusinessStatus();
    return (
        <div>
            <h2 className="text-mds md:text-xl text-center font-gothic text-card-foreground mb-4 leading-tight">¡Casi listo! Solo necesitamos algunos datos para tu orden.</h2>
            <div>
                <div className="flex gap-4">
                    <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="w-full text-sm md:text-lg mb-3 px-2 py-1 md:px-4 md:py-2 rounded-lg border-2 border-card-foreground/20 focus:border-red focus:ring-0 transition"
                    onChange={(e) => setCustomerField("name", e.target.value)}
                    value={customerInfo.name}
                    />
                    <input
                    type="number"
                    name="phone"
                    placeholder="Teléfono"
                    className="w-full text-sm md:text-lg mb-3 px-2 py-1 md:px-4 md:py-2 rounded-lg border-2 border-card-foreground/20 focus:border-red focus:ring-0 transition"
                    onChange={(e) => setCustomerField("phone", e.target.value)}
                    value={customerInfo.phone}
                    />
                </div>
                <p className="text-sm md:text-md font-gothic text-card-foreground/80">*Envios a domicilio solo en Comala Centro</p>
                <input
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    className="w-full text-sm md:text-lg mb-1 px-2 py-1 md:px-4 md:py-2 rounded-lg border-2 border-card-foreground/20 focus:border-red focus:ring-0 transition"
                    onChange={(e) => setCustomerField("address", e.target.value)}
                    value={customerInfo.address}
                />
                <button
                 className="w-full text-red mb-3 flex items-center gap-1 ml-2 cursor-pointer"
                 onClick={() => { 
                    const nextValue = !customerInfo.isPickup;
                    setCustomerField("isPickup", nextValue);
                    setCustomerField("address", nextValue ? "Pasare a recoger mi orden" : "");}}>
                   {customerInfo.isPickup 
                    ? <ImCheckboxChecked /> 
                    : <ImCheckboxUnchecked />}
                     <p className="text-sm md:text-md font-gothic text-card-foreground/80">No necesito agregar domicilio, pasaré a recoger mi orden</p>
                </button>
                <textarea
                    name="notes"
                    placeholder="Agrega detalles adicionales a tu orden (opcional)"
                    className="w-full text-sm md:text-lg mb-3 px-2 py-1 md:px-4 md:py-2 rounded-lg border-2 border-card-foreground/20 focus:border-red focus:ring-0 transition"
                    onChange={(e) => setCustomerField("notes", e.target.value)}
                    value={customerInfo.notes}
                />
                <button
                 className="w-full text-red mb-3 flex items-center gap-1 ml-2 cursor-pointer"
                 onClick={() => {
                    setIsCheckedPrivacy(!isCheckedPrivacy); 
                    }}>
                   {isCheckedPrivacy
                    ? <ImCheckboxChecked /> 
                    : <ImCheckboxUnchecked />}
                     <p
                     onClick={() => setIsActivePrivacy(true)} 
                     className="text-sm md:text-md font-gothic text-card-foreground/80"
                     >Acepto el 
                        <span className="underline ml-1">Aviso de Privacidad</span>
                    </p>
                </button>
                <div>
                    <p className="text-sm md:text-lg font-gothic text-center text-red/80 leading-tight">
                        {
                        //isOpen
                        true
                        ? "Recuerda que al recibir tu orden, te indicaremos el tiempo de espera que tomará hacer tu pedido y el costo del servicio a domicilio (si aplica)."
                        :  "⚠️ Actualmente estamos cerrados. Nuestro horario es Sábados y Domingos de 2:00 PM a 10:00 PM. ⚠️"
                        }
                    </p>
                </div>
            </div>
            {isActivePrivacy && (
                <PrivacyAdvertisment setActive={setIsActivePrivacy} />
            )}
        </div>
    )
}