"use client"
import { Button } from '@/components/ui/button';
import { PiSealCheckDuotone } from "react-icons/pi";
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation';


function Success() {
  const { buildWhatsAppMessage, clearCart } = useCart();
  const router = useRouter();

  const handleSendWhatsApp = () => {
    const message = buildWhatsAppMessage();
    if (!message) return;
    window.open(message, "_blank");
    clearCart()
    router.push("/menu")
  }
  return (
      <section className="min-h-[60vh] flex flex-col text-center items-center justify-center gap-6 px-4">
        <div className='flex items-center justify-center'>
          <PiSealCheckDuotone className='w-20 h-20 md:w-30 md:h-30 lg:w-50 lg:h-50 text-[#3cb15f]'/>
        </div>
        <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] text-black/80 ">Pago realizado correctamente</h2>
        <div className='flex justify-center items-center '>
          <Button
          type="button" 
          onClick={handleSendWhatsApp}
          className="cursor-pointer h-12 bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 transition duration-120 text-background text-lg font-medium">
          <p className="text-md md:text-lg">Enviar mi orden y mi comprobante de pago</p>
        </Button>
        </div>
      </section>
  )
}

export default Success