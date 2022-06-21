import {useQuery} from "react-query";
import { fetchEmergencyContacts } from "../../services/api/emergencyContact";

const useEmergencyContacts = (params) => useQuery(["emergencyContacts", params], () => fetchEmergencyContacts(params));

export {useEmergencyContacts};