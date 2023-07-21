const app = require("./app");
const { serverMessage } = require("./constants");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.PET_DB)
  .then(() => {
    console.log(serverMessage.dbConnection);
    app.listen(process.env.PORT, async () => {
      console.log(serverMessage.expressConnection);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
