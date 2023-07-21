const { tryCatchWrapper } = require("../../utils");

const { Notices } = require("../../services");

const getAll = async (req, res) => {
	// const { id: owner } = req.user;
	// const { page = 1, limit = 10, favorite, search } = req.query;
	// const skip = (page - 1) * limit;
	const response = await Notices.getAllNotices({}, "-createdAt -updatedAt");
	// .populate("owner", "email");
	res.json(response);
};

const add = async (req, res) => {
	// const { id: owner } = req.user;
    console.log(req.body);
	const newNotice = await Notices.addNotice({
		category,
		name,
		type,
		date,
		comments,
		sex,
		location,
		price,
		title,
		file,
	});
	res.status(201).json({
         notice: {
            _id: newNotice.id,
            name: newNotice.name,
            category: newNotice.category,
            type: newNotice.type,
            date: newNotice.date,
            comments: newNotice.comments,
            sex: newNotice.sex,
            location: newNotice.location,
            price: newNotice.price,
            title: newNotice.title,
            file: newNotice.file,
             } });
};

module.exports = {
	add: tryCatchWrapper(add),
	getAll: tryCatchWrapper(getAll),
};
