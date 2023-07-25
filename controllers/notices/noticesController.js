const { tryCatchWrapper, httpError } = require("../../utils");

const { Notices, Users } = require("../../services");

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
	const { page, limit, sort, search, category } = req.query;
	const { notices, total } = await Notices.findAll({
		page,
		limit,
		sort,
		search,
		category,
	});

	res.json({ notices, total });
};

const getOwnerNotices = async (req, res) => {
	const { id: owner } = req.user;
	const { notices, total } = await Notices.findOwnerNotices({
		owner,
	});

	res.json({ notices, total });
};

const getOwnerFavNotices = async (req, res) => {
	const { id } = req.user;
	const response = await Users.findUserById(id).populate("favorites");
	const favorites = response.favorites;
	const total = favorites.length;
	res.json({ favorites, total });
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

const addFavorite = async (req, res) => {
	const { id: owner } = req.user;
	const { noticeId } = req.params;
	const updatedStatus = await Notices.changeUserFavorites(
		owner,
		{ $addToSet: noticeId },
		{
			new: true,
		}
	);

	if (!updatedStatus) {
		throw httpError(404, "Not found");
	}
	res.json(updatedStatus);
};

const deleteFavorite = async (req, res) => {
	const { id: owner } = req.user;
	const { noticeId } = req.params;
	const updatedStatus = await Notices.changeUserFavorites(
		owner,
		{ $pull: noticeId },
		{
			new: true,
		}
	);

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
	addFavorite: tryCatchWrapper(addFavorite),
	getOwnerNotices: tryCatchWrapper(getOwnerNotices),
	getOwnerFavNotices: tryCatchWrapper(getOwnerFavNotices),
	deleteFavorite: tryCatchWrapper(deleteFavorite),
};
