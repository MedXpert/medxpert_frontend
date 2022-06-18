
import httpClient from "../../auth/httpClient";

const changePassword = async passwordInfo => {
  return await httpClient.put('/auth/user/password', passwordInfo, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export { changePassword };
