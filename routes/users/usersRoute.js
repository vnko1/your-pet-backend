const express = require("express");

const { authentificate, fieldValidation } = require("../../middlewares");
const {
  registerSchemaValidation,
  loginSchemaValidation,
} = require("../../schema");

const { Image } = require("../../services");

const {
  register,
  login,
  current,
  logout,
  update,
} = require("../../controllers");

const { file, schemaMessage } = require("../../constants");

const router = express.Router();

router.post(
  "/register",
  fieldValidation(registerSchemaValidation, schemaMessage.auth),
  register
);

router.post(
  "/login",
  fieldValidation(loginSchemaValidation, schemaMessage.auth),
  login
);

router.post("/current", authentificate, current);

router.post("/logout", authentificate, logout);

router.put(
  "/update",
  authentificate,
  Image.uploadErrorHandler(file.avatar.name),
  update
);

module.exports = router;
