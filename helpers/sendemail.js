const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const makeSend = async (data) => {
  const config = { ...data, from: "aerial1@meta.ua" };
  await sgMail.send(config);
  return true;
};

module.exports = makeSend;
