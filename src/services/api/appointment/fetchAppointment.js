import httpClient from "../../auth/httpClient";
const fetchAppointment = async healthFacilityId => {
    return await httpClient.get(`/appointments/${healthFacilityId}`);
};

export { fetchAppointment };