const express = require("express");

const ctrl = require("../../controllers");

const {
	fieldValidation,
	authentificate,
	isValidId,
	isValidIdNotice,
} = require("../../middlewares");

const { Image } = require("../../services");

const { addSchema, updateFavorite } = require("../../schema");

const router = express.Router();

router.get("/searchQuery", ctrl.getNoticeByQuery);

router.get("/owner", authentificate, ctrl.getOwnerNotices);

router.get("/owner/favorite", authentificate, ctrl.getOwnerFavNotices);

router.get("/:noticeId", isValidIdNotice, ctrl.getById);

router.put(
	"/:noticeId",
	authentificate,
	isValidIdNotice,
	fieldValidation(addSchema),
	ctrl.updateNoticeById
);

router.delete("/:noticeId", authentificate, isValidId, ctrl.delById);

router.patch(
	"/:noticeId/addFavorite",
	authentificate,
	isValidIdNotice,
	// fieldValidation(updateFavorite, "Missing field favorite"),
	ctrl.updateStatus
);

router.patch(
	"/:noticeId/delFavorite",
	isValidIdNotice,
	fieldValidation(updateFavorite, "Missing field favorite"),
	ctrl.updateStatus
);

router.post(
	"/add-pet",
	authentificate,
	Image.uploadErrorHandler("file", "file"),
	fieldValidation(addSchema),
	ctrl.add
);

module.exports = router;
