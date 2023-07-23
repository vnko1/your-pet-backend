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
	const { search = "", category, title } = req.query;
	console.log(search);
	console.log(category);
	console.log(title);
	const { notices, total } = await Notices.findAll({
		category,
		title,
		search,
	});

	res.json({ notices, total });
};

const updateNoticeById = async (req, res) => {
	const { noticeId } = req.params;

	const updatedNotice = await Notices.updateNotice(noticeId, req.body);

	if (!updatedNotice) {
		throw httpError(404, "Not found");
	}

	res.json(updatedNotice);
};

const delById = async (req, res) => {
	const { noticeId } = req.params;
	const result = await Notices.deleteNotice(noticeId);
	if (!result) {
		throw httpError(404, "Not found");
	}
	res.json({ message: "Notice deleted" });
};

module.exports = {
	add: tryCatchWrapper(add),
	getAll: tryCatchWrapper(getAll),
	getById: tryCatchWrapper(getById),
	getNoticeByQuery: tryCatchWrapper(getNoticeByQuery),
	updateNoticeById: tryCatchWrapper(updateNoticeById),
	delById: tryCatchWrapper(delById),
};
