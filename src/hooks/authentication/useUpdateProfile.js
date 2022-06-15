import {useMutation, useQueryClient} from 'react-query';
import { updateLoggedInUser } from '../../services/api/authentication';

const useUpdateProfile = () => {
  const queryClient = new useQueryClient();

  return useMutation(updateLoggedInUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};

export {useUpdateProfile};
