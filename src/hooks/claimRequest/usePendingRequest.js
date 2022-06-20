import {useQuery} from 'react-query';
import {pendingRequests} from '../../services/api/claimRequest';

const usePendingRequest = () =>
  useQuery('claim', pendingRequests, { refetchOnMount: false });

export {usePendingRequest};
