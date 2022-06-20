import httpClient from "../../auth/httpClient";
const searchHealthCareFacility = async (q) => {
  // 38.76111384105613,9.043677387443639
  return await httpClient.get(`healthcarefacility/search/?q=${q}`);
};

export { searchHealthCareFacility };