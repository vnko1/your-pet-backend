const express = require("express");

const {
  authentificate,
  authentificateByRefreshToken,
  fieldValidation,
  checkUserData,
} = require("../../middlewares");

const {
  registerSchemaValidation,
  loginSchemaValidation,
  editUserValidation,
} = require("../../schema");

const { Image } = require("../../services");

const {
  register,
  login,
  current,
  logout,
  refresh,
  update,
  getMe,
} = require("../../controllers");

const { file, schemaMessage } = require("../../constants");

const router = express.Router();

router.post("/register", fieldValidation(registerSchemaValidation), register);

router.post("/login", fieldValidation(loginSchemaValidation), login);

router.post("/refresh", authentificateByRefreshToken, refresh);

router.post("/current", authentificate, current);

router.post("/logout", authentificate, logout);

router.put(
  "/update",
  authentificate,
  Image.uploadErrorHandler(file.avatar.fieldName, file.avatar.fileName),
  fieldValidation(editUserValidation),
  checkUserData,
  update
);

router.get("/", authentificate, getMe);

module.exports = router;
