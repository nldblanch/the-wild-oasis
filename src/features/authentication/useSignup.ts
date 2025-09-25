import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const {
    mutate: signup,
    isPending: isSigningUp,
    error
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account successfully created!");
    },
    onError: (err) => {
      console.error(err);
      toast.error("There was an error creating the account.");
    }
  });
  return { signup, isSigningUp, error };
}
