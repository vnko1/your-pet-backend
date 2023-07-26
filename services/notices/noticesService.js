const { Notice } = require("../../models");
const { User } = require("../../models");

class Notices {
	static addNotice(newNotice) {
		return Notice.create(newNotice);
	}

	static findNoticeById(id) {
		return Notice.findById(id);
	}

	static async findAll({
		filter = "",
		category,
		page = 1,
		limit = 6,
		sort = "desc",
	}) {
		const perPage = page > 0 ? (page - 1) * limit : 0;
		const findOptions = filter
			? {
					$or: [{ title: { $regex: filter, $options: "i" } }],
					$or: [{ comments: { $regex: filter, $options: "i" } }],
			  }
			: {};

		if (category) {
			findOptions.category = category;
		}

		const notices = await Notice.find(findOptions)
			.skip(perPage)
			.limit(limit)
			.sort({
				category: sort,
				title: sort,
				comments: sort,
			});

		const total = await Notice.count(findOptions);

		return { notices, total };
	}

	static async findOwnerNotices({ owner }) {
		const notices = await Notice.find({ owner });

		const total = await Notice.count({ owner });

		return { notices, total };
	}

	static async findOwnerFavNotices({}) {
		const notices = await User.find(id);

		const total = await User.count(id);

		return { notices, total };
	}

	static changeUserFavorites(id, data) {
		const key = Object.keys(data);
		return User.findByIdAndUpdate(
			id,
			{ [key]: { favorites: data[key] } },
			{ new: true }
		);
	}

	static deleteById(id) {
		return Notice.findByIdAndDelete(id);
	}
}

module.exports = { Notices };
