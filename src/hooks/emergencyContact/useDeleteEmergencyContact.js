import {useMutation, useQueryClient} from "react-query";

import { deleteEmergencyContact } from "../../services/api/emergencyContact";

const useDeleteEmergencyContact = () => {
  const queryClient = useQueryClient();

  return useMutation(
    id => {
      deleteEmergencyContact(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["emergencyContacts"]);
      },
    },
  );
};

export {useDeleteEmergencyContact};