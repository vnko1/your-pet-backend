const express = require("express");

const { getSponsors } = require("../../controllers");

const router = express.Router();

router.get("/", getSponsors);

module.exports = router;
