const { Email } = require("./email/emailService");
const { Users } = require("./users/usersService");
const { Image } = require("./image/imageService");
const { Pets } = require("./pets/petsService");
const { Sponsors } = require("./sponsors/sponsorsService");
const { Articles } = require("./articles/articlesService");

module.exports = { Email, Users, Image, Pets, Sponsors, Articles };
