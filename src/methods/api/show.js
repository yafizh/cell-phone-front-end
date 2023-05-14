export default async function show(endpoint, id) {
  return await this.axios.get(`/${endpoint}/${id}`);
}
