import {useMutation, useQueryClient} from 'react-query';
import {createAppointment} from '../../services/api/appointment';

const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation(data => createAppointment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
    },
  });
};

export {useCreateAppointment};
