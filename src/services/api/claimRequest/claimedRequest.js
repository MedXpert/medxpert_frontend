import httpClient from "../../auth/httpClient";
const claimedRequest = async healthFacilityId => {
    return await httpClient.get(`/appointments/${healthFacilityId}`);
};

export { claimedRequest };