import {useQuery} from 'react-query';
import {claimedRequest} from '../../services/api/claimRequest';

const useClaimedRequest = () =>
  useQuery('claimed', claimedRequest, { refetchOnMount: false });

export {useClaimedRequest};
