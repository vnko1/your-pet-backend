const express = require("express");

const ctrl = require("../../controllers");

const { fieldValidation, authentificate, isValidId } = require("../../middlewares");

const { Image } = require("../../services");

const { addSchema } = require("../../schema");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:noticeId", isValidId, ctrl.getById);

router.post(
  "/add-pet",
  // authentificate,
  Image.uploadErrorHandler("file", "file"),
  fieldValidation(addSchema),
  ctrl.add
);

// router.delete("/:contactId", authenticate, isValidId, ctrl.delById);

// router.put(
//   "/:contactId",
//   authenticate,
//   isValidId,
//   validateBody(contactSchemas.addSchema, "Missing fields"),
//   ctrl.updateById
// );

// router.patch(
//   "/:contactId/favorite",
//   authenticate,
//   isValidId,
//   validateBody(contactSchemas.updateFavorite, "Missing field favorite"),
//   ctrl.updateStatus
// );

module.exports = router;
