const { tryCatchWrapper } = require("../../utils");
const { Articles } = require("../../services");

const getArticles = async (req, res) => {
  const { page, limit, sort, query } = req.query;
  const { articles, total } = await Articles.getAll({
    page,
    limit,
    sort,
    query,
  });

  res.json({ articles, total });
};

module.exports = { getArticles: tryCatchWrapper(getArticles) };
