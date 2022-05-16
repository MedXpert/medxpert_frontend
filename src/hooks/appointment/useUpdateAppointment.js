import {useMutation, useQueryClient} from 'react-query';
import {updateAppointment} from '../../services/api/appointment';
import {fetchAppointments} from '../../services/api/appointment';

const useUpdateAppointment = () => {
  const queryClient = new useQueryClient();

  return useMutation(updateAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['appointment']);
    },
  });
};

export {useUpdateAppointment};
