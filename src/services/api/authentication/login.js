import axios from 'axios';
import { baseUrl } from '../../../constants/api';

const url = baseUrl + 'auth/login'

const login = async loginInformation => {
  return await axios.post(url, loginInformation, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export { login };
