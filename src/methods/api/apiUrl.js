export default function apiUrl({ serverOptions, endpoint, query = {} }) {
  const { page, rowsPerPage, sortBy, sortType } = serverOptions;

  let url = `${endpoint}?page=${page}&limit=${rowsPerPage}&${new URLSearchParams(
    query
  ).toString()}`;

  if (sortBy && sortType) {
    return `${url}&sortBy=${sortBy}&sortType=${sortType}`;
  }
  `/${endpoint}?${new URLSearchParams(query).toString()}`;

  return url;
}
