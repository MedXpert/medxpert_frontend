import axios from 'axios';
import {fetchAppointments} from './fetchAppointment';
const createAppointment = async appointment => {
  try {
    const post = await axios.post('/api/appointments', appointment);
    return post;
  } catch (error) {
    console.warn('create appointment => error: ', error);
  }
};

export {createAppointment};
