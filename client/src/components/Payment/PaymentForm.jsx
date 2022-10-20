import React, { useState, useContext } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../../axios';
import { UserContext } from '../../Context/UserContext';
import Style from './paymentForm.module.css';

export default function PaymentForm() {
  const { value, order, setOrder, setCart, setTotal } = useContext(UserContext);

  var games = [];

  if (order.games) {
    order.games.forEach(game => games.push(game.id));
  }

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
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': {
          color: '#fff',
        },
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('orders/payment', {
          amount: order.total,
          id,
          games,
          user: order.user,
          email: value.email,
          name: value.name,
        });
        console.log(response.data);
        if (response.data.success) {
          console.log('Successful payment', response.data);
          setSuccess(true);
          setOrder('');
          setCart('');
          setTotal(0);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className={Style.payment}>
      {!success ? (
        <form classname={Style.vertical} onSubmit={handleSubmit}>
          <h1 className={Style.ask}>Please Fill Payment Details</h1>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className={Style.pay}>Pay</button>
        </form>
      ) : (
        <div className={Style.success}>
          <h2 className={Style.alert}>¡Payment Successful!</h2>
        </div>
      )}
    </div>
  );
}
