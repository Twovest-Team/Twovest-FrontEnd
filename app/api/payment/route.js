import Stripe from "stripe";
import { NextResponse} from "next/server";

export async function POST(request){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    //let priceId = data.priceId;
    //console.log(data)
    const session = await stripe.checkout.sessions.create({
    line_items: data,
    mode: "payment",
    /* success_url: `${process.env.NEXT_PUBLIC_URL}/shop/success`, */
    success_url: `${process.env.NEXT_PUBLIC_URL}/api/paymentSuccess`, 
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/shop`,
    
    })
  
    return NextResponse.json(session.url)
   
}