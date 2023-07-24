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

		if (search && title && category) {
			findOptions.$or.forEach((item) => {
				item.title = title;
				item.category = category;
			});
		} else if (search) {
			findOptions.$or.forEach((item) => {
				item.title = title;
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

	static updateNotice(id, newData) {
		return Notice.findByIdAndUpdate(id, newData, { new: true });
	}

	static deleteNotice(id) {
		return Notice.findByIdAndDelete(id);
	}
}

module.exports = { Notices };
