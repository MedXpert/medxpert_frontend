import httpClient from "../../auth/httpClient";
const fetchNearByHealthCareFacilities = async (params) => {
  // 38.76111384105613,9.043677387443639
  return await httpClient.get(`/healthcarefacility/nearyby/?coordinates=${params.location}&limit=${params.limit}`);
};

export { fetchNearByHealthCareFacilities };