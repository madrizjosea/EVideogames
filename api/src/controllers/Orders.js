const { Router } = require('express');
const router = Router();
const { Order } = require('../db')

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
