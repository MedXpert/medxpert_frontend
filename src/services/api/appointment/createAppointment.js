import httpClient from "../../auth/httpClient";

const createAppointment = async appointment => {
  const healthFacilityId = appointment.healthFacilityId;
  delete appointment.healthFacilityId;
  return await httpClient.post(`/appointments/${healthFacilityId}`, appointment, {
    headers: {
      "Content-Type": "application/json",
    }
  });
};

export { createAppointment };
