import { useSuspenseQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { data: cabins } = useSuspenseQuery({
    queryKey: ["cabins"],
    queryFn: getCabins
  });

  return { cabins };
}
