const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utils");

const isValidIdNotice = (req, res, next) => {
	const { noticeId } = req.params;
	if (!isValidObjectId(noticeId)) {
		next(httpError(400, `${noticeId} is not valid id`));
	}
	next();
};

module.exports = { isValidIdNotice };
