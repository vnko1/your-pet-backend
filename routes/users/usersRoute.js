const express = require("express");

const {
  authentificate,
  fieldValidation,
  checkUserData,
} = require("../../middlewares");

const {
  registerSchemaValidation,
  loginSchemaValidation,
  editUserValidation,
} = require("../../schema");

const { Image, Pets } = require("../../services");

const {
  register,
  login,
  current,
  logout,
  update,
  getMe,
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
  Image.uploadErrorHandler(file.avatar.fieldName, file.avatar.fileName),
  fieldValidation(editUserValidation, schemaMessage.auth),
  checkUserData,
  update
);

router.get("/", authentificate, getMe);

module.exports = router;
