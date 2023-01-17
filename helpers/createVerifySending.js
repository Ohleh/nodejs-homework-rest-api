const { BASE_URL } = process.env;

const createVerifySending = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Confirmation registration",
    text: "To confirm new user's email, please follow link",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}"> please follow link to confirm new user</a>`,
  };
  return mail;
};

module.exports = createVerifySending;
