import {useQuery} from "react-query";

import { fetchAllHealthCareFacilities } from "../../services/api/healthCareFacility";

const useAllHealthCareFacilities = () =>
  useQuery(["allHealthCareFacilities",], () => fetchAllHealthCareFacilities(), {refetchInterval: 100000, refetchOnWindowFocus: false});

export {useAllHealthCareFacilities};
