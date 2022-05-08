import {useQuery} from 'react-query';
import {fetchAppointment} from '../../services/api/appointment';

const useAppointment = id =>
  useQuery(['appointment', id], () => fetchAppointment(id), {
    staleTime: 30 * 1000,
  });

export {useAppointment};
