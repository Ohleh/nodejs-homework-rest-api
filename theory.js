const jwt = require("jsonwebtoken");

const payload = { id: 123, name: "Lisa" };
const secret = "secret word";
const token = jwt.sign(payload, secret);
console.log(token);

const untoken = jwt.decode(token);
console.log(untoken);

const verify = jwt.verify(token, secret);
console.log(verify);
