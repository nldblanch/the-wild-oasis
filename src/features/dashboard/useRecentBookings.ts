import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const numDays: number = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const today = new Date();
  const queryDate = subDays(today, numDays).toISOString();

  const {
    isLoading,
    data: bookings,
    error
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`]
  });

  [7, 30, 90].forEach((days) => {
    if (days !== numDays) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", `last-${days}`],
        queryFn: () => getBookingsAfterDate(subDays(today, days).toISOString())
      });
    }
  });

  return { isLoading, bookings, error };
}
