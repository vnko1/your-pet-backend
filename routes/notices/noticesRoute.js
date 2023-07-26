const express = require("express");

const {
	fieldValidation,
	authentificate,
	isValidId,
	checkFieldData,
} = require("../../middlewares");
const ctrl = require("../../controllers");
const { Image } = require("../../services");
const { addSchema } = require("../../schema");
const { file, errorMessage } = require("../../constants");

const router = express.Router();

router.get("/searchQuery", ctrl.getNoticeByQuery);

router.get("/owner", authentificate, ctrl.getOwnerNotices);

router.get("/owner/favorite", authentificate, ctrl.getOwnerFavNotices);

router.get("/:noticeId", isValidId(400, errorMessage[400]), ctrl.getById);

router.put(
	"/:noticeId",
	authentificate,
	isValidId(400, errorMessage[400]),
	fieldValidation(addSchema),
	ctrl.updateNoticeById
);

router.delete(
	"/:noticeId",
	authentificate,
	isValidId(400, errorMessage[400]),
	ctrl.delById
);

router.patch(
	"/:noticeId/addFavorite",
	authentificate,
	isValidId(400, errorMessage[400]),
	ctrl.addFavorite
);

router.patch(
	"/:noticeId/delFavorite",
	authentificate,
	isValidId(400, errorMessage[400]),
	ctrl.deleteFavorite
);

router.post(
	"/add-pet",
	authentificate,
	Image.uploadErrorHandler(file.notice.fieldName, file.notice.fileName),
	checkFieldData,
	fieldValidation(addSchema),
	ctrl.add
);

module.exports = router;
