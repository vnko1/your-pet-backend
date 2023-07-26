const { tryCatchWrapper, httpError } = require("../../utils");

const { Notices, Users, Image } = require("../../services");

const add = async (req, res) => {
	const { id: owner } = req.user;
	const response = await Notices.addNotice({ ...req.body, owner });
	res.status(201).json({data: response});
};

const getById = async (req, res) => {
	const { noticeId } = req.params;
	const response = await Notices.findNoticeById(noticeId);
	if (!response) {
		throw httpError(404, "Not found");
	}
	res.json({data: response});
};

const getNoticeByQuery = async (req, res) => {
	const { page, limit, sort, filter, category } = req.query;
	const { notices, total } = await Notices.findAll({
		page,
		limit,
		sort,
		filter,
		category,
	});

	res.json({ data: { notices, total } });
};

const getOwnerNotices = async (req, res) => {
	const { id: owner } = req.user;
	const { notices, total } = await Notices.findOwnerNotices({
		owner,
	});

	res.json({ data: { notices, total } });
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

	res.json({ data: updatedNotice });
};

const delById = async (req, res) => {
	const { noticeId } = req.params;
	const { id: owner } = req.user;

	const { notices } = await Notices.findOwnerNotices({
		owner,
	});
	const card = notices.find((notice) => notice.id === noticeId);

	if (card) {
		const notice = await Notices.deleteById(noticeId);
		await Image.deleteImage(notice.fileId);
	} else {
		throw httpError(404, `${noticeId} not exist or you not owner`);
	}

	if (!card) {
		throw httpError(404, "Not found");
	}
	res.json({ _id: noticeId });
};

const addFavorite = async (req, res) => {
	const { id: owner } = req.user;
	const { noticeId } = req.params;
	const updatedStatus = await Users.updateUser({
		owner,
		$addToSet: noticeId,
	});

	if (!updatedStatus) {
		throw httpError(404, "Not found");
	}
	res.json({ data: updatedStatus });
};

const deleteFavorite = async (req, res) => {
	const { id: owner } = req.user;
	const { noticeId } = req.params;
	const updatedStatus = await Users.updateUser({
		owner,
		$addToSet: noticeId,
	});

	if (!updatedStatus) {
		throw httpError(404, "Not found");
	}
	res.json({ data: updatedStatus });
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
