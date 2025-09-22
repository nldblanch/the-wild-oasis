import toast from "react-hot-toast";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: updateCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError: (error: Error) => toast.error(error.message)
  });

  return { isUpdating, updateCabin };
}
