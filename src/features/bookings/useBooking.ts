import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const id = Number(bookingId);

  const isValidId = bookingId !== undefined && !isNaN(Number(id));
  const {
    data: booking,
    isLoading,
    error
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
    enabled: isValidId
  });

  return {
    booking,
    isLoading,
    error: !isValidId ? new Error("No valid Booking ID found") : error
  };
}
