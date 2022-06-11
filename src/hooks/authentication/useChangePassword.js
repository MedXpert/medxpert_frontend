import {useMutation, useQueryClient} from 'react-query';
import { changePassword } from '../../services/api/authentication';

const useChangePassword = () => {
  const queryClient = new useQueryClient();

  return useMutation(changePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};

export {useChangePassword};
