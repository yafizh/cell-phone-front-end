export default async function store(endpoint, data) {
  return await this.axios.post(`/${endpoint}`, data);
}
