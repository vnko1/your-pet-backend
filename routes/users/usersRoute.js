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

const { Image } = require("../../services");

const {
  register,
  login,
  logout,
  refresh,
  update,
  getMe,
} = require("../../controllers");

const { file } = require("../../constants");

const router = express.Router();

router.post("/register", fieldValidation(registerSchemaValidation), register);

router.post("/login", fieldValidation(loginSchemaValidation), login);

router.post("/refresh", authentificate("refreshToken"), refresh);

router.get("/current", authentificate("token"), getMe);

router.post("/logout", authentificate("token"), logout);

router.put(
  "/update",
  authentificate("token"),
  Image.uploadErrorHandler(file.avatar.fieldName, file.avatar.fileName),
  fieldValidation(editUserValidation),
  checkUserData,
  update
);

module.exports = router;
