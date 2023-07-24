const { tryCatchWrapper, httpError } = require("../../utils");

const { Notices } = require("../../services");

const add = async (req, res) => {
	const { id: owner } = req.user;
	const response = await Notices.addNotice({ ...req.body, owner });
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
	const { search, category, title } = req.query;
	const { notices, total } = await Notices.findAll({
		category,
		title,
		search,
	});

	res.json({ notices, total });
};

const getOwnerNotices = async (req, res) => {
  const { id: owner } = req.user;
	const { search, favorite } = req.query;
	const { notices, total } = await Notices.findOwnerNotices({
		favorite,
		owner,
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

const updateStatus = async (req, res) => {
	const { noticeId } = req.params;
	const updatedStatus = await Notices.updateNotice(noticeId, req.body, {
		new: true,
	});
	if (!updatedStatus) {
		throw httpError(404, "Not found");
	}
	res.json(updatedStatus);
};

module.exports = {
	add: tryCatchWrapper(add),
	getById: tryCatchWrapper(getById),
	getNoticeByQuery: tryCatchWrapper(getNoticeByQuery),
	updateNoticeById: tryCatchWrapper(updateNoticeById),
	delById: tryCatchWrapper(delById),
	updateStatus: tryCatchWrapper(updateStatus),
	getOwnerNotices: tryCatchWrapper(getOwnerNotices),
};
