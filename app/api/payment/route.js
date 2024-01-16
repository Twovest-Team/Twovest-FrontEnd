import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    //let priceId = data.priceId;
    console.log(data)
    const session = await stripe.checkout.sessions.create({
    line_items: [data],
    mode: "payment",
    success_url: "http://localhost:3000/shop/success",
    cancel_url: "http://localhost:3000/shop",
    
    })
  
    return NextResponse.json(session.url)
   
}