import axios from 'axios';

const fetchAppointment = async (key, id) => {
  try {
    const res = await axios.get(`/api/appointments/:${id}`);
    const data = res.data;

    return data;
  } catch (error) {
    console.warn(error);
  }
};

export {fetchAppointment};
