import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import {
  BookingSortableKeys,
  BookingSortableValues,
  BookingSorts,
  BookingSummary,
  StatusFilterValues
} from "../../types";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = (searchParams.get("status") ||
    "all") as StatusFilterValues;
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status" as const, value: filterValue, method: "eq" as const };

  const sortByRaw = (searchParams.get("sortBy") ||
    "start_date-asc") as BookingSorts;
  const [field, value] = sortByRaw.split("-");
  const sortBy = {
    field: field as BookingSortableKeys,
    value: value as BookingSortableValues
  };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = { bookings: [], count: 0 },
    isLoading,
    error
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });
  }

  return { bookings, count, isLoading, error };
}
