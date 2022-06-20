import {useMutation, useQueryClient} from "react-query";
import {createEmergencyContact} from "../../services/api/emergencyContact";

const useCreateEmergencyContact = () => {
  const queryClient = useQueryClient();

  return useMutation(createEmergencyContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("emergencyContacts");
    },
  });
};

export {useCreateEmergencyContact};