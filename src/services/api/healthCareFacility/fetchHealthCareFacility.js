import httpClient from "../../auth/httpClient";
const fetchHealthCareFacility = async (id) => {
  // 38.76111384105613,9.043677387443639
  return await httpClient.get(`/healthCareFacility/${id}`).then((result) => result.data);
};

export { fetchHealthCareFacility };
