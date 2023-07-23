const {
	register,
	login,
	current,
	logout,
	update,
} = require("./users/usersController");

const {
	add,
	getAll,
	getById,
	getNoticeByQuery,
	updateNoticeById,
	delById
} = require("./notices/noticesController");

module.exports = {
	register,
	login,
	current,
	logout,
	update,
	add,
	getAll,
	getById,
	getNoticeByQuery,
	updateNoticeById,
	delById
};
