
import { useBusinessStatus } from "@/hooks/useBusinessStatus";

export default function BusinessStatusBanner() {
    const {isClosingSoon, diffToCloseMinutes, isOpen, isWeekend, openHours, openMinutes, hours} = useBusinessStatus();

    return (
        <div className="w-full">
            {isClosingSoon && <p className="text-md md:text-xl text-center p-2 text-amber-100 flex justify-center items-center bg-thirdary">{`!Date prisa estamos a punto de cerrar! Ordena dentro de ${diffToCloseMinutes} minutos`}</p>}
            {!isOpen && isWeekend && hours < 14 &&
                <p className="text-md md:text-xl text-center p-2 text-amber-100 flex justify-center items-center bg-thirdary">{`En este momento Comaleña esta cerrado, abrimos en ${openHours > 0 ? `${openHours} hora${openHours !== 1 ? "s" : ""}` : ""}  ${openMinutes} minuto${openMinutes !== 1 ? "s" : ""}`}</p>}
            {!isWeekend && <p className="text-md md:text-xl text-center p-2 text-amber-100 flex justify-center items-center bg-destructive">Nuestro Horario de Atencion es Sábados y Domingos de 2:00PM a 10:00PM</p>}
            {isWeekend && (hours >= 22) && <p className="text-md md:text-xl text-center p-2 text-amber-100 flex justify-center items-center bg-destructive">Nuestro Horario de Atencion es Sábados y Domingos de 2:00PM a 10:00PM</p>}
            {isOpen && hours < 21 && <p className="text-md md:text-xl text-center p-2 text-amber-100 flex justify-center items-center bg-secondary">Tenemos Servicio! Estamos listos para recibir tu orden</p>}
        </div>
    );
}