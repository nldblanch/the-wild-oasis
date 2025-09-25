import toast from "react-hot-toast";
import { updateCurrentUser as updateUserApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("User successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
    },
    onError: (error: Error) => toast.error(error.message)
  });

  return { isUpdating, updateUser };
}
