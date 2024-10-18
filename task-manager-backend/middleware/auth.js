const jwt = require("jsonwebtoken");
const { User } = require("../models");

function authenticateUser(req) {
  console.log(req.headers, "REQUEST");

  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED====", decoded);

      return { id: decoded.id };
    } catch (err) {
      throw new Error("Unauthorized");
    }
  }
  return null;
}

module.exports = { authenticateUser };
