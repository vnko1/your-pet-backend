const { register, login, current, logout, update } = require("./auth/auth");

const { add, getAll} = require("./notices/notices");

module.exports = { register, login, current, logout, update, add, getAll };
