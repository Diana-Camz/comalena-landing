import {redirect} from 'next/navigation';
import Stripe from 'stripe';
import SuccessContent from '@/components/SuccessContent';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


async function Success({searchParams}: {searchParams: Promise<{session_id?: string}>}) {
  const {session_id} = await searchParams;

  if(!session_id){
    redirect("/menu")
  }

  const session = await stripe.checkout.sessions.retrieve(session_id)

  if(session.payment_status !== "paid"){
    redirect("/menu")
  }
  return (
      <SuccessContent />
  )
}

export default Success