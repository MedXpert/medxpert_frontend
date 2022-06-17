import httpClient from "../../auth/httpClient";

const deleteAppointment = async id => {
  return await httpClient.delete(`/appointment/${id}`);
};

export {deleteAppointment};
