import axios from 'axios';
import { baseUrl } from '../../../constants/api';

const url = baseUrl + 'auth/login'

const login = async loginInformation => {
  try {
    const user = await axios.post(url, loginInformation, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return user;
  } catch (error) {
    console.warn('Login Error', error);
  }
};

export { login };
