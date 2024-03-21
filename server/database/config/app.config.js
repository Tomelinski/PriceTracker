module.exports = {
  development: {
    url: process.env.URL,
    server: process.env.APP_PORT,
    client: process.env.CLIENT_PORT,
    webScraper: process.env.WEB_SCRAPER,
  },
  test: {
    // Configure test env
  },
  production: {
    // Configure production env
  },
};
