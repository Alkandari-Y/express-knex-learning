const User = require("../models/User");
const ValidationError = require("../utils/errors/ValidationError");
const bcryptHashPassword = require("../utils/auth/bcryptHash");
const createTokensForUser = require("../utils/auth/createTokenForUser");
const bcrypt = require("bcrypt");

class UserService {
  static async createUser(data) {
    const { username, email, password } = data;

    const existingUser = await User.findExistingUser(username, email);

    if (existingUser) {
      throw new ValidationError("A user already exists");
    }

    const hashedPassword = await bcryptHashPassword(password);
    const [user] = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return user;
  }

  static generateUserTokens(user) {
    const access = createTokensForUser(user, "access");
    const refresh = createTokensForUser(user, "refresh");

    return { access, refresh };
  }

  static async authenticate(data) {
    const { username, password } = data;

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      throw new ValidationError("Invalid credentials");
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      throw new ValidationError("Invalid credentials");
    }
    return foundUser;
  }
}

module.exports = UserService;
