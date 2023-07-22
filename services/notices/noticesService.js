const { Notice } = require("../../models");

class Notices {
    static getAllNotices() {
        return Notice.find();
    }

    static addNotice(newNotice) {
        return Notice.create(newNotice);
    }

    static findNoticeById(id) {
        return Notice.findById(id);
      }
}

module.exports = { Notices };
