export default async function index(endpoint, query = {}) {
  const response = await this.axios.get(
    `/${endpoint}?${new URLSearchParams(query).toString()}`
  );
  if (response.status === 200) {
    return response.data;
  }

  return [];
}
