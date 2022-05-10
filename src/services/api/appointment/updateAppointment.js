import axios from 'axios';

const updateAppointment = async (id, attributes) => {
  try {
    await axios.patch(`/api/appointments/${id}`, attributes);
  } catch (error) {
    console.warn('error from updateAppointment: ', error);
  }
};

export {updateAppointment};
