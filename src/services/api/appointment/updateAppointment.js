import httpClient from "../../auth/httpClient";

const updateAppointment = async appointment => {
  delete appointment.healthFacilityId;
  return await httpClient.patch(`/appointments/${healthFacilityId}`, appointment, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export { updateAppointment };
