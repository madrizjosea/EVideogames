const { Account } = require('../db.js');

const createAccount = async (req, res, next) => {
  const { email } = req.body;
  console.log('EMAIL', email)
  try {
    const foundAccount = await Account.findOrCreate({ where: { email } });
    if (foundAccount) {
      return res.status(200).send('Account created successfully');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAccount,
};
