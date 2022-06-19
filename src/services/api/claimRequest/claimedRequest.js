import httpClient from "../../auth/httpClient";
const claimedRequest = async () => {
    return await httpClient.get(`/claimedhealthfacilities`);
};

export { claimedRequest };