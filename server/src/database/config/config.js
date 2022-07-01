require('dotenv').config()

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "lvtn2",
    host: "127.0.0.1",
    dialect: "mysql",
    url: "mysql://root@127.0.0.1:3306/lvtn2",
    logging: true,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'mysql',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
}
