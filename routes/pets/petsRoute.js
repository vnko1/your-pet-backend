const express = require("express");

const {
  authentificate,
  fieldValidation,
  checkPetData,
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
  fieldValidation(addPetSchemaValidation, schemaMessage.pet),
  checkPetData,
  addPet
);

router.delete("/:petId", deletePet);

module.exports = router;
