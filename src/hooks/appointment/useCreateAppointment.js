import {useMutation, useQueryClient} from 'react-query';
import {createAppointment} from '../../services/api/appointment';

const useCreateAppointment = () => {
  const queryClient = new useQueryClient();

  return useMutation(createAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['appointment']);
    },
  });
};

export {useCreateAppointment};
