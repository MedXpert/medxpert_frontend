import {useQueryClient, useMutation} from 'react-query';
import {searchHealthCareFacility} from '../../services/api/healthCareFacility';

// const useSearchHealthCareFacility = q =>
//   useQuery(['searchHealthCareFacilities', q], () => fetchHealthCareFacility(q), { refetchOnMount: false });

// export {useSearchHealthCareFacility};

const useSearchHealthCareFacility = () => {
  const queryClient = new useQueryClient();

  return useMutation(searchHealthCareFacility, {
    onSuccess: () => {
      queryClient.invalidateQueries(['healthCareFacility']);
    },
  });
};

export {useSearchHealthCareFacility};
