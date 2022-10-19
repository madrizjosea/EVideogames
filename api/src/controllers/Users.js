const { Router } = require('express');
const router = Router();
const { User, Account } = require('../db');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get(
  '/restricted',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('secreto');
  }
);

router.get('/', async (req, res) => {
  try {
    const accounts = await Account.findAll();
    if (accounts.length) res.status(200).json(accounts);
    else res.status(404).send('No users found.');
  } catch (err) {
    console.log('GET USERS ERROR--->', err);
  }
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const account = await Account.findByPk(email);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(400).send('not found');
    }
    res.status(200).json(account);
  } catch (err) {
    console.log('GET USER BY ID ERROR--->', err);
  }
});

router.post('/', async (req, res) => {
  const { name, email, password, role, image } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(401).send('Missing to send mandatory data');
  }
  sha1(password);
  try {
    const foundMail = await Account.findAll({
      where: {
        email: email,
      },
    });
    if (foundMail.length > 0) {
      res
        .status(201)
        .send('The email is already associated with an existing account');
    } else {
      await User.create({
        email,
        password,
      });

      await Account.create({
        name,
        email,
        role,
        image,
      });

      res.send('User created successfully');
    }
  } catch (error) {
    res.send('Failed to create user');
  }
});

router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { role, isActive } = req.body;
  try {
    const account = await Account.findByPk(email);
    if (isActive !== null) {
      await account.update({
        isActive,
      });
    }
    if (role) {
      await account.update({
        role,
      });
    }
    await account.save();
    res.status(200).json(account);
  } catch (err) {
    console.log('PUT USER ERROR--->', err);
  }
});

router.delete('/:email', async (req, res) => {
  let { email } = req.params;
  try {
    await Account.destroy({
      where: { email },
    });

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      await user.destroy();
    }

    res.status(200).send('User has been deleted');
  } catch (err) {
    console.log('DELETE USER BY ID ERROR--->', err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let loggedAccount = {};
  const userWithEmail = await User.findOne({ where: { email } }).catch(err => {
    console.log('Error ' + err);
  });
  if (!userWithEmail)
    return res.json({ message: 'Email or password does not match' });

  if (userWithEmail.password !== password)
    return res.json({ message: 'Email or password does not match' });

  if (userWithEmail) {
    loggedAccount = await Account.findByPk(email);
  }

  const jwtToken = jwt.sign(
    {
      id: loggedAccount.id,
      email: loggedAccount.email,
      name: loggedAccount.name,
      image: loggedAccount.image,
      role: loggedAccount.role,
    },
    process.env.JWT_SECRET
  ); // 'ext' is expiration time
  res.json({ user: loggedAccount, token: jwtToken });
});

module.exports = router;
