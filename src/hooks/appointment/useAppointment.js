import {useQuery} from 'react-query';

const useAppointment = () => useQuery(['appointment', id], fetchAppointment);
