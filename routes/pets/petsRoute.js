const express = require("express");

const {
  authentificate,
  fieldValidation,
  checkFieldData,
  checkUserAuth,
  isValidId,
} = require("../../middlewares");
const { addPetSchemaValidation } = require("../../schema");
const { Image } = require("../../services");
const { addPet, deletePet } = require("../../controllers");
const { file, errorMessage } = require("../../constants");

const router = express.Router();

router.use(authentificate("token"));

router.post(
  "/add",
  Image.uploadErrorHandler(file.pet.fieldName, file.pet.fileName),
  checkFieldData,
  fieldValidation(addPetSchemaValidation),
  addPet
);

router.delete(
  "/delete/:petId",
  isValidId(400, errorMessage[400]),
  checkUserAuth,
  deletePet
);

module.exports = router;
