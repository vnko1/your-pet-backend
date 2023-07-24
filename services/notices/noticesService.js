const { Notice } = require("../../models");

class Notices {
	static addNotice(newNotice) {
		return Notice.create(newNotice);
	}

	static findNoticeById(id) {
		return Notice.findById(id);
	}

	static async findAll({ search, category, title }) {
		const findOptions = search
			? {
					$or: [
						{ category: { $regex: search, $options: "i" } },
						{ title: { $regex: search, $options: "i" } },
					],
			  }
			: {};

		if (search && category) {
			findOptions.$or.forEach((item) => {
				item.title = search;
				item.category = category;
			});
		} else if (search) {
			findOptions.$or.forEach((item) => {
				item.title = search;
			});
		} else if (category) {
			findOptions.category = category;
		}

		const notices = await Notice.find(findOptions).sort({
			category: "desc",
			title: "desc",
		});

		const total = await Notice.count(findOptions);

		return { notices, total };
	}

	static async findOwnerNotices({ owner }) {
		const notices = await Notice.find({ owner });

		const total = await Notice.count({ owner });

		return { notices, total };
	}

	static async findOwnerFavNotices({ favorite }) {
		const notices = await Notice.find({ favorite });

		const total = await Notice.count({ favorite });

		return { notices, total };
	}

	static updateNotice(id, newData) {
		return Notice.findByIdAndUpdate(id, newData, { new: true });
	}

	static deleteNotice(id) {
		return Notice.findByIdAndDelete(id);
	}
}

module.exports = { Notices };
