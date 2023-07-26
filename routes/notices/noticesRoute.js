const express = require("express");

const {
	fieldValidation,
	authentificate,
	isValidId,
	isValidIdNotice,
	checkFieldData,
} = require("../../middlewares");
const ctrl = require("../../controllers");
const { Image } = require("../../services");
const { addSchema, editUserValidation } = require("../../schema");
const { file, schemaMessage } = require("../../constants");

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
	ctrl.addFavorite
);

router.patch(
	"/:noticeId/delFavorite",
	authentificate,
	isValidIdNotice,
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
