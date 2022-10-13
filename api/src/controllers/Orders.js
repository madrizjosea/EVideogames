const { Router } = require('express');
const router = Router();
const { Order } = require('../db')
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

router.post('/payment', async (req, res) => {
    let {amount, id} = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'Game Company',
            payment_method: id,
            confirm: true
        })
        console.log('Payment', payment)
        res.json({
            message: 'Payment Successful',
            success: true,
            payment: payment
        })
    } catch (error) {
        console.log('Error', error)
        res.json({
            message: 'Payment failed',
            success: false
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll();
        console.log(orders);
        if (orders.length) res.status(200).json(orders);
        else res.status(404).send('No registered orders found.');
    } catch (err) {
        console.log('GET ORDERS ERROR--->', err);
    }
})

module.exports = router;
