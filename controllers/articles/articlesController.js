const { tryCatchWrapper } = require("../../utils");
const { Articles } = require("../../services");

const getArticles = async (req, res) => {
  const { page, limit, sort, filter } = req.query;
  const { articles, total } = await Articles.getAll({
    page,
    limit,
    sort,
    filter,
  });

  res.json({ articles, total });
};

module.exports = { getArticles: tryCatchWrapper(getArticles) };
