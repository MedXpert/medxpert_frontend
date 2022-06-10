
import httpClient from "../../auth/httpClient";

const updateLoggedInUser = async userInfo => {
  return await httpClient.put('/auth/user', userInfo, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export { updateLoggedInUser };
