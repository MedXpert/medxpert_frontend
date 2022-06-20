import httpClient from "../../auth/httpClient";
const pendingRequests = async () => {
    return await httpClient.get(`/claimrequests?claim=pending`);
};

export { pendingRequests };