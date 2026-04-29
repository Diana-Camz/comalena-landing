"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

 function Failed() {
  const router = useRouter()
  return (
      <section className="min-h-[60vh] flex flex-col text-center items-center justify-center gap-6 px-4">
        <div className='flex items-center justify-center'>
          <p className='text-5xl md:text-7xl lg:text-9xl'>⚠️</p>
        </div>
        <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] text-black/80">Tu pago no se realizó</h2>
        <div className='flex justify-center items-center '>
          <Button
          type="button" 
          onClick={() => {router.push('/menu')}}
          className="cursor-pointer h-12 bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 transition duration-120 text-background text-lg font-medium">
          <p className="text-md md:text-lg">Regresar al menú</p>
        </Button>
        </div>
      </section>
  )
}

export default Failed;
