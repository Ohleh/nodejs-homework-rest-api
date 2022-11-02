const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;
// port  вказаний, якщо ні то хай буде 3000

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
    // exit(1) закриває всі запущені процеси
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
