/**
 * Calculate limit and offset to use in findAndCountAll Sequilize Method
 * @param {*} pageNo
 * @param {*} pageSize
 * @returns
 */
const getPagination = (pageNo, pageSize) => {
  const limit = pageSize ? +pageSize : 3;
  const offset = pageNo ? pageNo * limit : 0;

  return { limit, offset };
};

/**
 * Return a paging object with the data
 * @param {*} data
 * @param {*} pageNo
 * @param {*} limit
 * @returns
 */
const getPagingData = (data, pageNo, limit) => {
  const { count: totalItems, rows: content } = data;
  const currentPage = pageNo ? +pageNo : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, content, totalPages, currentPage };
};

module.exports = { getPagination, getPagingData };
