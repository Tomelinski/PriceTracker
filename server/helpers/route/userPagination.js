const { User } = require('../../models');

const userPagination = async (model, userId, page = 1, limit = 3, options = {}) => {
  try {
    const offset = (page - 1) * +limit;
    const { count, rows } = await User.findAndCountAll({
      where: { id: userId },
      limit: +limit,
      offset,
      ...options,
    });

    // Extract associated items from the rows
    const items = rows.map((row) => row[model]);

    return {
      totalCount: count,
      data: items,
    };
  } catch (error) {
    console.error('User pagination helper error:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = userPagination;
