import React from "react";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

 
const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY
const stripetest = loadStripe(PUBLIC_KEY)

export default function Stripe(){

    return(
        <Elements stripe={stripetest}>
            <PaymentForm/>
        </Elements>
    )
}