const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authResolvers = {
  register: async ({ username, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    return user.id;
  },
  login: async ({ username, password }) => {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return token;
  },
};

module.exports = authResolvers;
