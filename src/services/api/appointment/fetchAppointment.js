import axios from 'axios';

const fetchAppointment = async id => {
  try {
    const res = await axios.get(`/api/appointments/${id}`);
    const data = await res.data.appointment;

    return data;
  } catch (error) {
    console.warn(error);
  }
};

export {fetchAppointment};
