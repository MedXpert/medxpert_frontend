import httpClient from "../../auth/httpClient";

const revertClaimRequest = async id => {
  return await httpClient.delete(`/claimrequest/${id}`);
};

export {revertClaimRequest};
