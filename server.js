const app = require("./app");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.PET_DB)
  .then(() => {
    console.log("Database connection successful");
    app.listen(process.env.PORT, async () => {
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
