export default async function store(endpoint, data) {
  const response = await this.axios.post(`/${endpoint}`, data);
  return response;
}
