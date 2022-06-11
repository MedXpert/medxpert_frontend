import httpClient from "../../auth/httpClient";
const fetchAppointments = async healthFacilityId => {
    return await httpClient.get(`/appointments/${healthFacilityId}`);
};

export { fetchAppointments };