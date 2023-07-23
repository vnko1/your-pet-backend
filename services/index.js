const { Email } = require("./email/emailService");
const { Users } = require("./users/usersService");
const { Image } = require("./image/imageService");
const { Pets } = require("./pets/petsService");
const { Sponsors } = require("./sponsors/sponsorsService");

module.exports = { Email, Users, Image, Pets, Sponsors };
