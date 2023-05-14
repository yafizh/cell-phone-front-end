export default async function index(endpoint) {
    const response = await this.axios.get(`/${endpoint}`);
    if (response.status === 200) {
        return response.data;
    }

    return [];
};