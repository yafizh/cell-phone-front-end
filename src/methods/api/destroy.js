export default async function destroy(endpoint, id) {
    return await this.axios.delete(`/${endpoint}/${id}`);
  }
  