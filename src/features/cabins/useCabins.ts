import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    const { data: cabins, isLoading, error } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins,
        placeholderData: []
    })

    return { cabins, isLoading, error }
}