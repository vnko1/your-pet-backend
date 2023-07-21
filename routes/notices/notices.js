const express = require("express");

const ctrl = require("../../controllers");

const { fieldValidation, authentificate } = require("../../middlewares");

const { noticeSchemas } = require("../../models");

const router = express.Router();

router.get("/", ctrl.getAll);

// router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
	"/add-pet",
	// authentificate,
	fieldValidation(noticeSchemas.addSchema),
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
