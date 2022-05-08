import axios from 'axios';
const createAppointment = appointment => {
  try {
    return axios.post('/api/appointments', {...appointment});
  } catch (error) {
    console.warn('create appointment => error: ', error);
  }
};

export {createAppointment};
