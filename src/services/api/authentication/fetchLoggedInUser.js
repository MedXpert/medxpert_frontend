import httpClient from "../../auth/httpClient";
const fetchLoggedInUser = async () => {
    return await httpClient.get('/auth/user');
};

export { fetchLoggedInUser };