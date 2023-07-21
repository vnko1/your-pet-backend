const { tryCatchWrapper } = require("../../utils");

const { Notice } = require("../../models");

const getAll = async (req, res) => {
    // const { id: owner } = req.user;
    // const { page = 1, limit = 10, favorite, search } = req.query;
    // const skip = (page - 1) * limit;
    const response = await Contact.find(
    //     { owner }, "-createdAt -updatedAt", {
    //   skip,
    //   limit,
    //   favorite,
    //   search,
    // }
    )
    // .populate("owner", "email");
    res.json(response);
  };
  
const add = async (req, res) => {
    const { id: owner } = req.user;
    const result = await Notice.create({ ...req.body, owner });
    res.status(201).json(result);
  };

  module.exports = {
    add: tryCatchWrapper(add),
    getAll: tryCatchWrapper(getAll),
  };
  