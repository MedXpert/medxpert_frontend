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
      const apps = await fetchAppointment('1');
      console.log(apps);
      queryClient.invalidateQueries(['appointment']);
    },
  });
};

export {useCreateAppointment};
