import {useQuery} from 'react-query';
import {fetchHealthCareFacilities} from '../../services/api/healthCareFacility';

const useHealthCareFacilities = () =>
  useQuery('healthCareFacilities', fetchHealthCareFacilities);

export {useHealthCareFacilities};
