import {useMutation, useQueryClient} from 'react-query';
import {updateHealthCareFacility} from '../../services/api/healthCareFacility';

const useUpdateAppointment = () => {
  const queryClient = new useQueryClient();

  return useMutation(updateHealthCareFacility, {
    onSuccess: () => {
      queryClient.invalidateQueries(['appointment']);
    },
  });
};

export {useUpdateAppointment};
