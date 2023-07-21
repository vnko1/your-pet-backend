const { tryCatchWrapper } = require("../../utils");

const { Notices } = require("../../services");

const getAll = async (req, res) => {
	// const { id: owner } = req.user;
	// const { page = 1, limit = 10, favorite, search } = req.query;
	// const skip = (page - 1) * limit;
	const response = await Notices.getAllNotices({}, "-createdAt -updatedAt");
	// .populate("owner", "email");
	res.json(response);
};

const add = async (req, res) => {
	// const { id: owner } = req.user;
	const response = await Notices.addNotice(req.body);
	res.status(201).json(response);
};

module.exports = {
	add: tryCatchWrapper(add),
	getAll: tryCatchWrapper(getAll),
};
