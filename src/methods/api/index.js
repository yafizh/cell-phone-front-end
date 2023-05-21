import apiUrl from "./apiUrl";

export default async function index(
  endpoint,
  query = {},
  serverOptions = null
) {
  let response = null;
  if (serverOptions) {
    response = await this.axios.get(
      apiUrl({
        serverOptions,
        endpoint,
        query,
      })
    );

    if (response.status === 200) {
      return {
        items: response.data.items,
        itemsLength: response.data.itemsLength,
      };
    }
  } else {
    response = await this.axios.get(
      `/${endpoint}?${new URLSearchParams(query).toString()}`
    );

    if (response.status === 200) {
      return response.data;
    }
  }

  return [];
}
