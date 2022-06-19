import {useMutation, useQueryClient} from "react-query";
import { signUp } from "../../services/api/authentication";

const useSignUp = () => {
  const queryClient = new useQueryClient();

  return useMutation(signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export {useSignUp};
