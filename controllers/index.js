const {
	register,
	login,
	current,
	logout,
	update,
} = require("./users/usersController");

const {
	add,
	getById,
	getNoticeByQuery,
	updateNoticeById,
	delById,
	updateStatus,
} = require("./notices/noticesController");

module.exports = {
	register,
	login,
	current,
	logout,
	update,
	add,
	getById,
	getNoticeByQuery,
	updateNoticeById,
	delById,
	updateStatus,
};
