const express = require("express");

const { authentificate } = require("../../middlewares");

const { Image } = require("../../services");

const {
  register,
  login,
  current,
  logout,
  update,
} = require("../../controllers");

const { file } = require("../../constants");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/current", authentificate, current);

router.post("/logout", authentificate, logout);

router.put(
  "/update",
  authentificate,
  Image.uploadErrorHandler(file.avatar.name),
  update
);

module.exports = router;
