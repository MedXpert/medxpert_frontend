import httpClient from "../../auth/httpClient";

const claimRequest = async claim => {
  return await httpClient.post(`/claimrequests/`, claim, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export { claimRequest };
