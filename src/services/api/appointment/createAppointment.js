import axios from 'axios';

const createAppointment = async appointment => {
  console.log(appointment);
  const post = await axios.post('/api/appointments', {...appointment});
  return post;
};

export {createAppointment};
