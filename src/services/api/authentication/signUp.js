import axios from 'axios';
import { baseUrl } from '../../../constants/api';
const url = baseUrl + 'auth/register'
const signUp = async newUser => {
  try {
    const user = await axios.post(url, newUser, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return user;
  } catch (error) {
    console.warn('Registration Error => error: ', error, 'url: ', url, 'new user', newUser);
  }
};

export { signUp };
