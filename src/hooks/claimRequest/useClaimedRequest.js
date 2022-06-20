import {useQuery} from 'react-query';
import {claimedRequest} from '../../services/api/claimRequest';

const useClaimedRequest = () =>
  useQuery('claim', claimedRequest, { refetchOnMount: false });

export {useClaimedRequest};
