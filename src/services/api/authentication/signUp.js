import axios from "axios";
import { baseUrl } from "../../../constants/api";

const url = baseUrl + "auth/register";

const signUp = async newUser => {
  return await axios.post(url, newUser, {
    headers: {
      "Content-Type": "application/json",
    }
  });
};

export { signUp };
