import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CheckinProps {
  bookingId: number;
  breakfast?:
    | {
        has_breakfast: boolean;
        extras_price: number;
        total_price: number;
      }
    | Record<string, never>;
}

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkin,
    isPending: isCheckingIn,
    error
  } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }: CheckinProps) =>
      updateBooking(bookingId, {
        status: "checked-in",
        has_paid: true,
        ...breakfast
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      queryClient.invalidateQueries();

      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in")
  });

  return { checkin, isCheckingIn, error };
}
