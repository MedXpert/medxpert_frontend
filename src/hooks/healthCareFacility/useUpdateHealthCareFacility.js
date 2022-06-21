import {useMutation, useQueryClient} from 'react-query';
import {updateHealthCareFacility} from '../../services/api/healthCareFacility';

const useUpdateHealthCareFacility = () => {
  const queryClient = new useQueryClient();

  return useMutation(updateHealthCareFacility, {
    onSuccess: () => {
      queryClient.invalidateQueries(['healthCareFacility']);
    },
  });
};

export {useUpdateHealthCareFacility};
