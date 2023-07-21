const emailFrom = "valenkoedu@gmail.com";

const file = { avatar: { name: "avatar", width: 182, height: 182 } };

const errorMessage = {
  400: "Bad request",
  401: {
    wrongAuth: "Not authorized",
    wrongLogin: "Email or password is wrong",
  },
  404: "Not found",
  409: "Email in use",
};

const expiresIn = "7d";

const fileFormats = ["jpg", "png"];

const serverMessage = {
  expressConnection: `Server running. Use our API on port: ${process.env.PORT}`,
  dbConnection: "Database connection successful",
};

module.exports = {
  emailFrom,
  file,
  errorMessage,
  expiresIn,
  fileFormats,
  serverMessage,
};
