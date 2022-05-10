import {useMutation, useQueryClient} from 'react-query';
import {
  createAppointment,
  fetchAppointment,
  fetchAppointments,
} from '../../services/api/appointment';

const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation(createAppointment, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['appointment']);
    },
  });
};

export {useCreateAppointment};
