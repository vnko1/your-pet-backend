const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const {
  usersRoute,
  petsRoute,
  sponsorsRoute,
  articlesRoute,
} = require("./routes");
const { errorMessage } = require("./constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", usersRoute);

app.use("/pets", petsRoute);

app.use("/sponsors", sponsorsRoute);

app.use("/articles", articlesRoute);

app.use((req, res) => {
	res.status(404).json({ message: errorMessage[404] });
});

app.use((err, _, res, next) => {
	const { status = 500 } = err;
	res.status(status).json({ message: err.message });
});

module.exports = app;
