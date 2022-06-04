import {useMutation, useQueryClient} from 'react-query';
import { login } from '../../services/api/authentication';

const useLogin = () => {
  const queryClient = new useQueryClient();

  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};

export {useLogin};
