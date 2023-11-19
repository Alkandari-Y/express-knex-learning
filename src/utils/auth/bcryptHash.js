const bcrypt = require('bcrypt');

const bcryptHashPassword = async (password) => {
    const rounds = 10;
    const hashedPassword = await bcrypt.hash(password, rounds);
    return hashedPassword;
}

module.exports = bcryptHashPassword;