import axios from 'axios';

const updateAppointment = async ({id, reminderStatus}) => {
  try {
    await axios.patch(`/api/appointments/${id}`, {
      reminderStatus: reminderStatus,
    });
  } catch (error) {
    console.warn('error from updateAppointment: ', error);
  }
};

export {updateAppointment};
