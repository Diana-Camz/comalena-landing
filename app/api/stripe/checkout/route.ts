import { OrderItem } from "@/types/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request){
    try {
        const items: OrderItem[] = await req.json();
        const session = await stripe.checkout.sessions.create({
        line_items: [
            ...items.map((item: OrderItem) => ({
                price_data: {
                    currency: "mxn",
                    product_data: {
                        name: item.title,
                    },
                    unit_amount: item.unitPrice * 100,
                },
                quantity: item.quantity,
            }))
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/menu`,
        })
    return NextResponse.json({url: session.url})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Something went wrong"})
    }
}