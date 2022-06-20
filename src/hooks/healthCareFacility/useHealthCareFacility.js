import {useQuery} from 'react-query';
import {fetchHealthCareFacility} from '../../services/api/healthCareFacility';

const useHealthCareFacility = id =>
  useQuery(['healthCareFacility', id], () => fetchHealthCareFacility(id), { refetchOnMount: false });

export {useHealthCareFacility};
