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
