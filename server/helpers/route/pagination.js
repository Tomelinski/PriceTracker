const paginate = async (model, conditions = {}, page = 1, limit = 3, options = {}) => {
    try {
      const offset = (page - 1) * +limit;
      const { count, rows } = await model.findAndCountAll({
        where: { ...conditions },
        limit: +limit,
        offset,
        ...options,
      });
  
      return {
        totalCount: count,
        data: rows,
      };
    } catch (error) {
      console.error('Pagination helper error:', error);
      throw new Error('Internal Server Error');
    }
  };
  
  module.exports = paginate;