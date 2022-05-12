import {useQuery} from 'react-query';
import {fetchAppointment} from '../../services/api/appointment';

const useAppointment = id =>
  useQuery(['appointment', id], () => fetchAppointment(id));

export {useAppointment};
