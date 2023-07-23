const { tryCatchWrapper, httpError } = require("../../utils");

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

const getById = async (req, res) => {
	const { noticeId } = req.params;
	const result = await Notices.findNoticeById(noticeId);
	if (!result) {
		throw httpError(404, "Not found");
	}
	res.json(result);
};

const getNoticeByQuery = async (req, res) => {
	const { category, title, search } = req.query;

	const { notices, total } = await Notices.findAll({
		title,
		category,
		search,
	});

	// if (!!title && !category) {
	// 	const result = await Notices.findNoticeByQuery({
	// 		title,
	// 	});

	// 	return result;
	// }

	// if (title && category) {
	// 	const result = await Notices.findNoticeByQuery({
	// 		title,
	// 		category,
	// 	});

	// 	return result;
	// }

	// if (!result) {
	// 	throw httpError(404, "Not found");
	// }
	res.json({ notices, total });
};

module.exports = {
	add: tryCatchWrapper(add),
	getAll: tryCatchWrapper(getAll),
	getById: tryCatchWrapper(getById),
	getNoticeByQuery: tryCatchWrapper(getNoticeByQuery),
};
