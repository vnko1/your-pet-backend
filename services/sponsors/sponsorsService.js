const { Sponsor } = require("../../models");

class Sponsors {
  static getAll() {
    return Sponsor.find();
  }
}

module.exports = { Sponsors };
