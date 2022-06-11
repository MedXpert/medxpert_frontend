import {useQuery} from 'react-query';
import {fetchNearByHealthCareFacilities} from '../../services/api/healthCareFacility';

const useFetchNearByHealthCareFacilities = params =>
  useQuery(['healthCareFacilities', params], () => fetchNearByHealthCareFacilities(params));

export {useFetchNearByHealthCareFacilities};
