const { tryCatchWrapper, httpError } = require("../../utils");

const { Notices, Users, Image } = require("../../services");
const { errorMessage } = require("../../constants");

const add = async (req, res) => {
  const { id: owner } = req.user;
  const response = await Notices.addNotice({ ...req.body, owner });
  res.status(200).json({ data: response });
};

const getById = async (req, res) => {
  const { noticeId } = req.params;
  const response = await Notices.findNoticeById(noticeId);
  if (!response) {
    throw httpError(404, errorMessage[404]);
  }
  res.json({ data: response });
};

const getNoticeByQuery = async (req, res) => {
  const { page, limit, sort, filter, category, sex, date } = req.query;
  const { notices, total } = await Notices.findAll({
    page,
    limit,
    sort,
    filter,
    category,
    sex,
    date,
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
  const response = await Users.findUserById(id);
  const updatedFavorites = response.favorites;
  const total = updatedFavorites.length;

  res.json({ data: { favorites: updatedFavorites, total } });
};
``;

const delById = async (req, res) => {
  const { noticeId } = req.params;
  const { id: owner } = req.user;

  const { notices } = await Notices.findOwnerNotices({
    owner,
  });
  const card = notices.find((notice) => notice.id === noticeId);

  if (card) {
    const notice = await Notices.deleteById(noticeId);

    if (!notice) {
      throw httpError(404, errorMessage[404]);
    }
    await Image.deleteImage(notice.fileId);
    await Users.updateUser({
      id: owner,
      data: { $pull: noticeId },
      fieldName: "favorites",
    });
  } else {
    throw httpError(401, errorMessage[401].wrongAuth);
  }

  res.json({ _id: noticeId });
};

const addFavorite = async (req, res) => {
  const { id: owner } = req.user;
  const { noticeId } = req.params;
  const updatedStatus = await Users.updateUser({
    id: owner,
    fieldName: "favorites",
    data: { $addToSet: noticeId },
  });

  if (!updatedStatus) {
    throw httpError(404, errorMessage[404]);
  }
  res.json({
    data: { favorites: updatedStatus.favorites },
  });
};

const deleteFavorite = async (req, res) => {
  const { id: owner } = req.user;
  const { noticeId } = req.params;
  const updatedStatus = await Users.updateUser({
    id: owner,
    fieldName: "favorites",
    data: { $pull: noticeId },
  });

  if (!updatedStatus) {
    throw httpError(404, errorMessage[404]);
  }
  res.json({
    data: { favorites: updatedStatus.favorites },
  });
};

module.exports = {
  add: tryCatchWrapper(add),
  getById: tryCatchWrapper(getById),
  getNoticeByQuery: tryCatchWrapper(getNoticeByQuery),
  delById: tryCatchWrapper(delById),
  addFavorite: tryCatchWrapper(addFavorite),
  getOwnerNotices: tryCatchWrapper(getOwnerNotices),
  getOwnerFavNotices: tryCatchWrapper(getOwnerFavNotices),
  deleteFavorite: tryCatchWrapper(deleteFavorite),
};
