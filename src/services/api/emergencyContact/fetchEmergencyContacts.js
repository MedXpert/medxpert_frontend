import httpClient from "../../auth/httpClient";
const fetchEmergencyContacts = async (params) => {
  console.log("type", params.type);

  const res =  await httpClient.get(`/emergencycontacts/?type=${params.type}`);
  return res;
};

export { fetchEmergencyContacts };