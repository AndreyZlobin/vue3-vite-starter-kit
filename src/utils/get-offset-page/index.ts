export const getOffsetPage = (page: number, limit: number): number =>
  page === 0 ? page : (page - 1) * limit;
