import {useMutation, useQueryClient} from 'react-query';
import { claimRequest } from '../../services/api/claimRequest';

const useLogin = () => {
  const queryClient = new useQueryClient();

  return useMutation(claimRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['claim']);
    },
  });
};

export {useLogin};
