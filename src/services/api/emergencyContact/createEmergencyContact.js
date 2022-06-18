import httpClient from "../../auth/httpClient";

const createEmergencyContact = async emergencyContact => {
  console.log(emergencyContact);
  return await httpClient.post("emergencycontacts/", emergencyContact, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  
};

export { createEmergencyContact };