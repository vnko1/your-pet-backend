const { Users } = require("./users/usersService");
const { Image } = require("./image/imageService");
const { Notices } = require("./notices/noticesService");
const { Pets } = require("./pets/petsService");
const { Sponsors } = require("./sponsors/sponsorsService");
const { Articles } = require("./articles/articlesService");

module.exports = { Users, Image, Pets, Sponsors, Articles, Notices };
