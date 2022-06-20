import {useQuery} from "react-query";
import {fetchAppointments} from "../../services/api/appointment";

const useAppointments = () => useQuery("appointments", fetchAppointments);

export {useAppointments};
