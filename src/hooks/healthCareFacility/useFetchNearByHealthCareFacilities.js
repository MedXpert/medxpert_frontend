import {useQuery} from "react-query";
import {fetchNearByHealthCareFacilities} from "../../services/api/healthCareFacility";

const useFetchNearByHealthCareFacilities = params =>
  useQuery(["healthCareFacilities", params], () => fetchNearByHealthCareFacilities(params), {refetchInterval: 10000});

export {useFetchNearByHealthCareFacilities};
