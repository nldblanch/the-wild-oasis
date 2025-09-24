import {
  BookingDetail,
  BookingFilterAny,
  BookingSortableKeys,
  BookingSortableValues,
  BookingSummary,
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

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string): Promise<any> {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string): Promise<any> {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<any> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
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
