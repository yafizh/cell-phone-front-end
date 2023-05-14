export default async function updateUser(endpoint, id, data) {
  return await this.axios.put(`/${endpoint}/${id}`, data);
}
