const nodemailer = require("nodemailer");
const { EMAIL_AUTMATIC, PASSWORD_EMAIL } = process.env;


const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
      user: EMAIL_AUTMATIC, // generated ethereal user
      pass: PASSWORD_EMAIL, // generated ethereal password
   },
   tls: {
      rejectUnauthorized: false,
   },
});

transporter
   .verify()
   .then(() => {
      console.log("Ready for send emails");
   })
   .catch((err) => {
      console.log(err);
   });

module.exports = transporter;
