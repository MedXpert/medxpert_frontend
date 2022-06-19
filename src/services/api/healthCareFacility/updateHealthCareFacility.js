
import httpClient from "../../auth/httpClient";

const updateHealthCareFacility = async healthFacilityInfo => {
    const id = healthFacilityInfo.id;
    delete healthFacilityInfo.id;
    console.log(id)
    return await httpClient.patch(`/healthCareFacility/${id}/`, healthFacilityInfo, {
        headers: {
        'Content-Type': 'application/json',
        }
    });
};

export { updateHealthCareFacility };
