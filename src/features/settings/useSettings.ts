import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import type { Settings } from "../../types";

export function useSettings() {

    const { isLoading, error, data: settings } = useQuery<Settings>({
        queryKey: ['settings'],
        queryFn: getSettings
    });
    return { isLoading, error, settings };
}