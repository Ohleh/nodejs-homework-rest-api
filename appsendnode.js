const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: "aerial1@meta.ua", // з якої буде відправка пошти
    pass: META_PASSWORD,
  },
};

// об'єкт який відсилає лист
const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "4@chernila.com.ua",
  from: "aerial1@meta.ua",
  subject: "Confirmation letter",
  text: "Congratulations to new user",
  html: "<H1>Congratulations to new user</H1>",
};

transport
  .sendMail(email)
  .then(() => console.log("snodemailer send email seccess"))
  .catch((error) => console.log(error.message));
