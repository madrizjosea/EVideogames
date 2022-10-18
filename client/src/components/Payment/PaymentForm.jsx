import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from '../../axios'
import { UserContext } from "../../Context/UserContext";




export default function PaymentForm(){

    const { order, setOrder } = useContext(UserContext)

    var gamesid = []
    
    if(order.games){
    order.games.forEach(game => gamesid.push(game.id))
    }
    console.log('order', order, 'gamesid', gamesid)
    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#c4f0ff',
                color: '#fff',
                fontWeight: 500,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ":-webkit-autofill": {color: '#fce883'},
                ":-placeolder": {color: '#87bbfd'}
            },
            invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee'
            }
        }
    } 
    
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
   

    if(!error){
        try {
            const {id} = paymentMethod
            const response = await axios.post('orders/payment', {
                amount: order.total*100,
                id,
                gamesid: String(gamesid),
                user: order.user
            })

            if(response.data.success){
                console.log('Successful payment', response.data)
                setSuccess(true)
                setOrder('')
                
            }
        } catch (error) {
            console.log('Error', error)
        }
    } else {
        console.log(error.message)
    }
    }
    return(
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        : 
        <div>
            <h2>Payment Successful</h2>
        </div> 
        }
        </>
    )
}