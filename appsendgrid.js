const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

// додаємо ключ до об'єкта який ми імпортували: викликаємо метод і передаємо йому ключ
sgMail.setApiKey(SENDGRID_API_KEY); // sendgrid готовий.

const mail = {
  to: "4@chernila.com.ua",
  from: "aerial1@meta.ua",
  subject: "Confirmation letter",
  text: "Congratulations to new user",
  html: "<H1>Congratulations to new user</H1>",
};

// для відправки листа метод send і then якщо ок або error
sgMail
  .send(mail)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

// або як фунція:
// const makeSend = async (data) => {
//   const makeSendMail = { ...data, from: "aerial1@meta.ua" };
//   await sgMail.send(makeSendMail);
//   return true;
// };

// module.exports = makeSend;
