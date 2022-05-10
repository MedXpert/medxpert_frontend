import {useMutation, useQueryClient} from 'react-query';
import {updateAppointment} from '../../services/api/appointment';

const useUpdateAppointment = () => {
  const queryClient = new useQueryClient();

  return useMutation(updateAppointment, {
    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries(['appointments', 'appointment']);
    },
  });
};

export {useUpdateAppointment};
