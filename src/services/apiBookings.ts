import {
  BookingDetail,
  BookingFilterAny,
  BookingsAfterDateType,
  BookingSortableKeys,
  BookingSortableValues,
  BookingSummary,
  StaysAfterDateType,
  StaysTodayActivityType,
  UpdateBookingProps
} from "../types";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

interface GetBookingsProps {
  filter?: BookingFilterAny;
  sortBy?: {
    field: BookingSortableKeys;
    value: BookingSortableValues;
  };
  page?: number;
}
export async function getBookings({
  filter,
  sortBy,
  page
}: GetBookingsProps): Promise<{ data: BookingSummary[]; count: number }> {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, start_date, end_date, num_of_nights, num_of_guests, status, total_price, cabins(name), guests(full_name, email)",
      { count: "exact" }
    );

  if (filter) {
    const method = filter.method || "eq";
    if (method === "eq") {
      query = query.eq(filter.field, filter.value);
    } else if (method === "gte") {
      query = query.gte(filter.field, filter.value);
    } else if (method === "lte") {
      query = query.lte(filter.field, filter.value);
    } else if (method === "gt") {
      query = query.gt(filter.field, filter.value);
    } else if (method === "lt") {
      query = query.lt(filter.field, filter.value);
    }
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.value === "asc"
    });
  }

  if (page) {
    const from = PAGE_SIZE * (page - 1);
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("No bookings not found");
  }
  const transformedBookings =
    data?.map((booking) => ({
      ...booking,
      cabins: Array.isArray(booking.cabins)
        ? booking.cabins[0]
        : booking.cabins,
      guests: Array.isArray(booking.guests) ? booking.guests[0] : booking.guests
    })) || [];
  return {
    data: transformedBookings as BookingSummary[],
    count: count as number
  };
}

export async function getBooking(id: number): Promise<BookingDetail> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data as BookingDetail;
}

export async function getBookingsAfterDate(
  date: string
): Promise<BookingsAfterDateType[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as BookingsAfterDateType[];
}

export async function getStaysAfterDate(
  date: string
): Promise<StaysAfterDateType[]> {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as StaysAfterDateType[];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<
  StaysTodayActivityType[]
> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data as StaysTodayActivityType[];
}

export async function updateBooking(
  id: number,
  obj: Partial<UpdateBookingProps>
): Promise<BookingDetail> {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data as BookingDetail;
}

export async function deleteBooking(id: number): Promise<null> {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
