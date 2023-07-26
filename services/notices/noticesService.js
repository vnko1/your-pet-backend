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

		const total = await Notice.countDocuments(findOptions);

		return { notices, total };
	}

	static async findOwnerNotices({ owner }) {
		const notices = await Notice.find({ owner });

		const total = await Notice.countDocuments({ owner });

		return { notices, total };
	}

	static async findOwnerFavNotices({}) {
		const notices = await User.find(id);

		const total = await User.countDocuments(id);

		return { notices, total };
	}

	static deleteById(id) {
		return Notice.findByIdAndDelete(id);
	}
}

module.exports = { Notices };
