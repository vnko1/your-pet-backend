const {
	register,
	login,
	current,
	logout,
	update,
	getMe,
} = require("./users/usersController");

const {
	add,
	updateNoticeById,
	updateStatus,
	delById,
	getById,
	getNoticeByQuery,
	getOwnerNotices,
} = require("./notices/noticesController");

const { addPet, deletePet } = require("./pets/petsController");

const { getSponsors } = require("./sponsors/sponsorsController");

const { getArticles } = require("./articles/articlesController");

module.exports = {
	register,
	login,
	current,
	logout,
	update,
	getMe,
	addPet,
	deletePet,
	getSponsors,
	getArticles,
	add,
	updateNoticeById,
	updateStatus,
	delById,
	getById,
	getNoticeByQuery,
	getOwnerNotices,
};
