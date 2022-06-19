import {useQuery} from 'react-query';
import {searchHealthCareFacility} from '../../services/api/healthCareFacility';

const useSearchHealthCareFacility = q =>
  useQuery(['searchHealthCareFacilities', q], () => fetchHealthCareFacility(q), { refetchOnMount: false });

export {useSearchHealthCareFacility};
