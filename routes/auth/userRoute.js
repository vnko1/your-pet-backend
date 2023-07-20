const express = require("express");

const { authentificate, checkFileFieldName } = require("../../middlewares");

const { Image } = require("../../services");

const {
  register,
  login,
  current,
  logout,
  update,
} = require("../../controllers");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/current", authentificate, current);

router.post("/logout", authentificate, logout);

router.put("/update", authentificate, Image.upload("avatar"), update);

module.exports = router;
