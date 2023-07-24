const express = require("express");

const { getArticles } = require("../../controllers");

const router = express.Router();

router.get("/", getArticles);

module.exports = router;
