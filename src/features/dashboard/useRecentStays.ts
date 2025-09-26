import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const numDays: number = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const today = new Date();
  const queryDate = subDays(today, numDays).toISOString();

  const { data: stays } = useSuspenseQuery({
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return getStaysAfterDate(queryDate);
    },
    queryKey: ["stays", `last-${numDays}`]
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  [7, 30, 90].forEach((days) => {
    if (days !== numDays) {
      queryClient.prefetchQuery({
        queryKey: ["stays", `last-${days}`],
        queryFn: () => getStaysAfterDate(subDays(today, days).toISOString())
      });
    }
  });

  return { stays, confirmedStays, numDays };
}
