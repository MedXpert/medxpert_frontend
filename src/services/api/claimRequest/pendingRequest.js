import httpClient from "../../auth/httpClient";
const claimedRequest = async () => {
    return await httpClient.get(`/claimrequests?claim=pending`);
};

export { claimedRequest };