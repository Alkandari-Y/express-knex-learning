const { connection, migrations, seeds } = require("./src/config").database;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations
  },

  staging: {
    client: 'postgresql',
    pool: {
      min: 2,
      max: 10
    },
    connection,
    migrations,
    seeds
  },

  production: {
    client: 'postgresql',
    pool: {
      min: 2,
      max: 10
    },
    connection,
    migrations,
    seeds
  }

};
