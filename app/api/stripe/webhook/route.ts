import { NextResponse } from "next/server";
import {headers} from "next/headers"
import Stripe from "stripe";
import {Resend} from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const whsec = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_SECRET!)

export async function POST(request: Request){
    const body = await request.text();
    const headersList = headers();
    const sig = (await headersList).get('stripe-signature');
    let event;

    if(!sig){
        return NextResponse.json({error: "Missing stripe-signature header"}, {status: 400})
    }

    if(!whsec){
        return NextResponse.json({error: 'Missing stripe webhook secret'}, {status: 400})
    }
    try {
     event = stripe.webhooks.constructEvent(body, sig, whsec)
    } catch (error) {
        return NextResponse.json({error: "Webhook signature verification failed"}, {status: 400})
    }
    switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const paymentId = session.payment_intent;
      const amount = session.amount_total ? session.amount_total/100 : 0;
      const status = session.status;
      const customerName = session.customer_details?.name
      const customerEmail = session.customer_details?.email

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: "dcampos0495@gmail.com",
        subject: "Nuevo pedido pagado",
        html: `
            <p>ID de pago: ${paymentId}</p>
            <p>Cantidad pagada: ${amount}</p>
            <p>Status: ${status}</p>
            <p>Cliente: ${customerName}</p>
            <p>Email: ${customerEmail}</p>
        `
    })
      break;
    default:
      console.error(`Unhandled event type ${event.type}`);
    }
    return new Response(null, {status: 200})
}