import { useSuspenseQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import type { Settings } from "../../types";

export function useSettings() {
  const { data: settings } = useSuspenseQuery<Settings>({
    queryKey: ["settings"],
    queryFn: getSettings
  });
  return { settings };
}
