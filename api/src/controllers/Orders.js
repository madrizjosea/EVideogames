const { Router } = require('express');
const router = Router();
const { Order, Account, Library, Videogame } = require('../db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
var moment = require('moment');
var date = moment().format('YYYY-MM-DD hh:mm:ss');

router.post('/payment', async (req, res) => {
  let { amount, email, id, user, games, name } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'USD',
      description: 'Game Company',
      payment_method: id,
      confirm: true,
    });

    const foundAccount = await Account.findAll({
      where: {
        email,
      },
    });

    const newOrder = await foundAccount[0].createOrder({
      date: date,
      total: amount,
      username: name,
      games,
    });

    res.json({
      message: 'Payment Successful',
      success: true,
      payment: payment,
      order: newOrder,
      user: foundAccount[0].email,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    console.log(orders);
    if (orders.length) res.status(200).json(orders);
    else res.status(404).send('No registered orders found.');
  } catch (err) {
    console.log('GET ORDERS ERROR--->', err);
  }
});

router.put('/', async (req, res) => {
  let { id, change, accountEmail, games } = req.body;
  try {
    const order = await Order.findOne({
      where: {
        id: id,
      },
    });
    await order.update({
      state: change,
    });
    await order.save();

    if (change === 'Completed') {
      const foundLibrary = await Library.findOrCreate({
        where: {
          accountEmail,
        },
      });
      games.forEach(async game => {
        const orderGame = await Videogame.findByPk(game);
        await orderGame.addLibrary(foundLibrary[0].id);
      });
    }

    res.send("successful change");
  } catch (error) {
    console.log('Error ', error);
    res.status(400).send('Error ', error);
  }
});

module.exports = router;
