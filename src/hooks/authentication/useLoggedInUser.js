import {useQuery} from 'react-query';
import {fetchLoggedInUser } from '../../services/api/authentication';

const useLoggedInUser = () =>
  useQuery('user', fetchLoggedInUser, { refetchOnMount: false });

export {useLoggedInUser};
