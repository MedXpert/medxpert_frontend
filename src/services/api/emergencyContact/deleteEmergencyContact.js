import httpClient from "../../auth/httpClient";

const deleteEmergencyContact = async id => {
  console.log("id from fetch", id);
  return await httpClient.delete(`/emergencycontact/${id}`);
};

export { deleteEmergencyContact };