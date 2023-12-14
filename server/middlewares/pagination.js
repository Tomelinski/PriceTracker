// middlewares/pagination.js
const paginate = require('../helpers/route/pagination');

async function paginationMiddleware(req, res, next) {
  const originalSend = res.send;

  res.send = function (data) {
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      return originalSend.call(this, data);
    }

    if (Array.isArray(parsedData)) {
      const offset = parseInt(req.query.offset) || 0;
      const limit = parseInt(req.query.limit) || 10;

      const paginatedData = paginate(parsedData, offset, limit);
      return originalSend.call(this, JSON.stringify(paginatedData));
    }

    return originalSend.call(this, data);
  };

  next();
}

module.exports = paginationMiddleware;