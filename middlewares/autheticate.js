/*
1. дістає заголок Authorization з req.headers.
2. розділити заголовок на дві частини.
3. якщо перше слово !== "Bearer" - викадає 401 помилку.
4. перевірити чи токен валідний, якщо ні - то викидаємо 401.
5. шукаємо в базі (по токену) користувача з таким id. якщо немає - викидаємо 401.
*/

// щоб перевірити чи токен валідний
const jwt = require("jsonwebtoken");

// для пошуку користувача в базі
const { Users } = require("../models/users");

const { RequestError } = require("../helpers");

// щоб перевірити що токен валідний, треба використати секретний ключ
const { SECRET_KEY } = process.env;

// створюємо нашу мідлвару (функу для перевірки)
const autheticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (!bearer) {
      throw RequestError(401);
    }
    // перевіряємо чи токен валідний
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      // шукаємо користувача з таким id
      const user = await Users.findById(id);
      if (!user || !user.token) {
        throw Error("Unauthorized (invalid token)");
      }
      // записуємо в req.user значення юезра, щоб потім присвоїти його ID для owner
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = autheticate;
