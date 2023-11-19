const User = require("../models/User");
const db = require("../database");
const ValidationError = require("../utils/errors/ValidationError");
const bcryptHashPassword = require("../utils/auth/bcryptHash");
const createTokensForUser = require('../utils/auth/createTokenForUser');
const bcrypt = require('bcrypt');

class UserService {
  static async createUser(data) {
    const { username, email, password } = data;
    
    const existingUser = await db("users")
      .where({ username })
      .orWhere({ email }).first();

    if (existingUser) {
      throw new ValidationError("A user already exists");
    }

    const hashedPassword = await bcryptHashPassword(password);

    const [user] = await db("users")
      .insert({ username, email, password: hashedPassword })
          .returning("*");
      
      return user;
    }
    
    static generateUserTokens(user) {
        const access = createTokensForUser(user, 'access');
        const refresh = createTokensForUser(user, 'refresh')

        return { access, refresh };
    }

    static async loginUser(data) {
        const { username, password } = data;

        const foundUser = await db('users').where('username', username).first()
        
        if (!foundUser) {
            throw new ValidationError('Invalid credentials');
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            throw new ValidationError('Invalid credentials');
        }

        return foundUser;
    }
}

module.exports = UserService;
