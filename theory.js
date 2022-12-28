// const jwt = require("jsonwebtoken");

// const payload = { id: 123, name: "Lisa" };
// const secret = "secret word";
// const token = jwt.sign(payload, secret);
// console.log(token);

// const untoken = jwt.decode(token);
// console.log(untoken);

// const verify = jwt.verify(token, secret);
// console.log(verify);
//
//
//
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const payload = {
  id: "6376975f313a742bc5174290",
};

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

console.log(token);

try {
  const verify = jwt.verify(token, SECRET_KEY);
  console.log(verify);
} catch (error) {
  console.log(error.message);
}

// sendgrid

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

//

// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env
