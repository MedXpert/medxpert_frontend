import {Linking} from 'react-native';
import axios from 'axios';

export const sendEmail = async (to, subject, body) => {
  await axios
    .post('http://michaelbelete.pythonanywhere.com/api/mail/', {
      to: to,
      subject: subject,
      body: body,
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log('error', err);
    });
};
