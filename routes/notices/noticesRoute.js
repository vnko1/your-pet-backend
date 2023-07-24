const express = require("express");

const ctrl = require("../../controllers");

const {
	fieldValidation,
	authentificate,
	isValidId,
} = require("../../middlewares");

const { Image } = require("../../services");

const { addSchema, updateFavorite } = require("../../schema");

const router = express.Router();

router.get("/searchQuery", ctrl.getNoticeByQuery);

router.get("/:noticeId", isValidId, ctrl.getById);

router.put(
	"/:noticeId",
	authentificate,
	isValidId,
	fieldValidation(addSchema),
	ctrl.updateNoticeById
);

router.delete("/:noticeId", authentificate, isValidId, ctrl.delById);

router.patch(
	"/:noticeId/addFavorite",
	isValidId,
	fieldValidation(updateFavorite, "Missing field favorite"),
	ctrl.updateStatus
);

router.patch(
	"/:noticeId/delFavorite",
	isValidId,
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