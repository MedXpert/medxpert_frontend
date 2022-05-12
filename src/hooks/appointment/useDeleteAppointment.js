import {useMutation, useQueryClient} from 'react-query';
import {
  createAppointment,
  deleteAppointment,
} from '../../services/api/appointment';

const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    id => {
      console.log(id);
      deleteAppointment(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['appointment']);
      },
    },
  );
};

export {useDeleteAppointment};
