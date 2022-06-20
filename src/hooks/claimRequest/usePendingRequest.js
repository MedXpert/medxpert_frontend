import {useQuery} from 'react-query';
import {claimedRequest} from '../../services/api/claimRequest';

const usePendingRequest = () =>
  useQuery('claim', claimedRequest, { refetchOnMount: false });

export {usePendingRequest};
