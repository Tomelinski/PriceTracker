module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    url: process.env.URL,
    server: process.env.SERVER_PORT,
    client: process.env.CLIENT_PORT,
    webScraper: process.env.SCAPRER_API
  },
  test: {
    // Configure test env
  },
  production: {
    // Configure production env
  },
};