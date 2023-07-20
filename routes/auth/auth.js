const express = require("express");

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

router.post("./current", current);

router.post("/logout", logout);

router.patch("/update", update);

module.exports = router;
