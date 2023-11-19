const crypto = require('node:crypto');

module.exports = crypto.randomBytes(128).toString('base64');