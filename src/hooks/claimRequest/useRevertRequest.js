import {useMutation, useQueryClient} from 'react-query';
import { revertClaimRequest } from '../../services/api/claimRequest';

const useRevertRequest = id => {
  const queryClient = new useQueryClient();

  return useMutation(revertClaimRequest(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['claim']);
    },
  });
};

export {useRevertRequest};
