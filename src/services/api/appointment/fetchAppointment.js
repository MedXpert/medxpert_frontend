import axios from 'axios';

const fetchAppointment = async id => {
  try {
    const res = await axios.get(`/api/appointments/${id}`);
    console.log(res.data);
    if (res.data != null) {
      const data = await res.data.appointment;
      return data;
    }
  } catch (error) {
    console.warn('fetch appointment function => ' + 'error: ' + error);
  }
};

export {fetchAppointment};
