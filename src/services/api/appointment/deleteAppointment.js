import axios from 'axios';
const deleteAppointment = async id => {
  try {
    const deleteApp = await axios.delete(`/api/appointments/${id}`);
    return deleteApp;
  } catch (e) {
    console.log(e);
  }
};

export {deleteAppointment};
