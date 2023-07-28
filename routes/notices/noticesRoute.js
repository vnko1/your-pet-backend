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

router.get("/", ctrl.getNoticeByQuery);

router.get("/owner", authentificate("token"), ctrl.getOwnerNotices);

router.get("/favorites", authentificate("token"), ctrl.getOwnerFavNotices);

router.get("/:noticeId", isValidId(400, errorMessage[400]), ctrl.getById);

router.delete(
  "/delete/:noticeId",
  authentificate("token"),
  isValidId(400, errorMessage[400]),
  ctrl.delById
);

router.patch(
  "/favorites/add/:noticeId",
  authentificate("token"),
  isValidId(400, errorMessage[400]),
  ctrl.addFavorite
);

router.patch(
  "/favorites/delete/:noticeId",
  authentificate("token"),
  isValidId(400, errorMessage[400]),
  ctrl.deleteFavorite
);

router.post(
  "/add",
  authentificate("token"),
  Image.uploadErrorHandler(file.notice.fieldName, file.notice.fileName),
  checkFieldData,
  fieldValidation(addSchema),
  ctrl.add
);

module.exports = router;
