const { tryCatchWrapper } = require("../../utils");
const { Sponsors } = require("../../services");

const getSponsors = async (req, res) => {
  const sponsors = await Sponsors.getAll();
  res.json({ sponsors });
};

module.exports = { getSponsors: tryCatchWrapper(getSponsors) };
