function paginate(data, offset, limit) {
    const totalCount = data.length;
    const paginatedData = data.slice(offset, offset + limit);
  
    return {
      totalCount,
      data: paginatedData,
    };
  }
  
module.exports = paginate;