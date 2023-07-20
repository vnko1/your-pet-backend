const { tryCatchWrapper } = require("../../utils");

const register = async (req, res) => {
  res.json({ mess: "reg" });
};

const login = async (req, res) => {
  res.json({ mess: "reg" });
};

const current = async (req, res) => {
  res.json({ mess: "reg" });
};

const logout = async (req, res) => {
  res.json({ mess: "reg" });
};

const update = async (req, res) => {
  res.json({ mess: "reg" });
};

module.exports = {
  register: tryCatchWrapper(register),
  login: tryCatchWrapper(login),
  current: tryCatchWrapper(current),
  logout: tryCatchWrapper(logout),
  update: tryCatchWrapper(update),
};
