const express = require("express");

const {
  authentificate,
  fieldValidation,
  checkPetData,
  checkUserAuth,
  isValidId,
} = require("../../middlewares");
const { addPetSchemaValidation } = require("../../schema");
const { Image } = require("../../services");
const { addPet, deletePet } = require("../../controllers");
const { file, schemaMessage } = require("../../constants");

const router = express.Router();

router.use(authentificate);

router.post(
  "/",
  Image.uploadErrorHandler(file.pet.fieldName, file.pet.fileName),
  checkPetData,
  fieldValidation(addPetSchemaValidation, schemaMessage.pet),
  addPet
);

router.delete("/:petId", isValidId, checkUserAuth, deletePet);

module.exports = router;
