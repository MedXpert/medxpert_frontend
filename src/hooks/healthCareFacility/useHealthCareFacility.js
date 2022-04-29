import {useQuery} from 'react-query';
import {fetchHealthCareFacility} from '../../services/api/healthCareFacility';

const useHealthCareFacility = id =>
  useQuery(['fetchHealthCareFacility', id], () => fetchHealthCareFacility(id));

export {useHealthCareFacility};
