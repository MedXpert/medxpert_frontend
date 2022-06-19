import {useQuery} from 'react-query';
import {fetchNearByHealthCareFacilities} from '../../services/api/healthCareFacility';

const useFetchNearByHealthCareFacilities = params =>
  useQuery(['NearByHealthCareFacilities', params], () => fetchNearByHealthCareFacilities(params), {refetchOnMount: false});

export {useFetchNearByHealthCareFacilities};
