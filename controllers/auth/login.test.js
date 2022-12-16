// const mongoose = require("mongoose");
// const request = require("supertest");
// require("dotenv").config();

// const app = require("../../app");
// const { User } = require("../../models/users");

// const { DB_TEST_HOST, PORT } = process.env;

// // token - res.
// // user {
// // email - string
// // subscription - string
// // }

// const login = require("./login");

// describe("test login controller", () => {
//   let server;
//   beforeAll(() => (server = app.listen(PORT)));
//   afterAll(() => server.close());

//   // з'єднуємося з тестовою базою даних
//   beforeEach((done) => {
//     mongoose.connect(DB_TEST_HOST).then(() => done());
//   });

//   // видаляємо з колекції дані які додати під час тесту
//   afterEach((done) => {
//     mongoose.connection.db.dropCollection(() =>
//       mongoose.connection.close(() => done())
//     );
//   });

//   // створюємо нового користувача і додаємо його в базу
//   test("test login router", async () => {
//     const newUser = {
//       email: "1bccbb@bbb.com",
//       password: "123qwe12322",
//     };
//     const user = await User.create(newUser);

//     //1. перевіряємо правильність отриманої відповіді на AJAX-запит документації
//     //2. перевірятя що в базу запитався потрібний елемент

//     const loginUser = {
//       email: "1bccbb@bbb.com",
//       password: "123qwe12322",
//     };

//     const response = await request(app).post("api/users/login").send(loginUser);
//     expect(response.statusCode).toBe(200); // перевірка чи статус 200.
//     const { body } = response; // беоемл тіло
//     expect(body.token).toeTruthy(); // чи є в нас взагалі токет в тілі
//     const { token } = await user.findById(user._id); // щукаємо користувача в базі
//     expect(body.token).toBe(token); // беремо токен з бази
//   });
// });
