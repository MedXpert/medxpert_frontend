import axios from 'axios';

const fetchAppointments = async () => {
  try {
    const res = await axios.get('api/appointments');
    let data = res.data.appointments;
    return data;
  } catch (err) {
    console.warn(err);
  }
};

export {fetchAppointments};
