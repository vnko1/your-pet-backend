const {
  registerSchemaValidation,
  loginSchemaValidation,
  editUserValidation,
} = require("./users/usersSchemaValidation");

const { addPetSchemaValidation } = require("./pets/petsSchemaValidation");

module.exports = {
  registerSchemaValidation,
  loginSchemaValidation,
  editUserValidation,
  addPetSchemaValidation,
};
