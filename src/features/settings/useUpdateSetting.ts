import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings } from "../../types";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi as (
      newSetting: Partial<Settings>
    ) => Promise<Settings>,
    onSuccess: () => {
      toast.success("Setting successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["settings"]
      });
    },
    onError: (error: Error) => toast.error(error.message)
  });

  return { isUpdating, updateSetting };
}
