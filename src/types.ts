// ===== CORE ENTITIES =====
export interface Cabin {
  id: number;
  created_at: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string;
}

export interface Guest {
  full_name: string;
  email: string;
  country: string;
  country_flag: string;
  national_id: string;
}

export interface Settings {
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}

// ===== BOOKING TYPES =====
export interface BookingSummary {
  id: number;
  created_at: string;
  start_date: string | null;
  end_date: string | null;
  num_of_nights: number | null;
  num_of_guests: number | null;
  total_price: number | null;
  status: ("unconfirmed" | "checked-in" | "checked-out") | null;
  cabins: {
    name: string | null;
  };
  guests: {
    full_name: string | null;
    email: string | null;
  };
}

export interface BookingDetail {
  id: number;
  created_at: string;
  start_date: string | null;
  end_date: string | null;
  num_of_nights: number | null;
  num_of_guests: number | null;
  cabin_price: number | null;
  extras_price: number | null;
  total_price: number | null;
  status: ("unconfirmed" | "checked-in" | "checked-out") | null;
  has_breakfast: boolean | null;
  has_paid: boolean | null;
  observations: string | null;
  cabins: Cabin;
  guests: Guest;
}

export interface UpdateBookingProps {
  start_date: string | null;
  end_date: string | null;
  num_of_nights: number | null;
  num_of_guests: number | null;
  cabin_price: number | null;
  extras_price: number | null;
  total_price: number | null;
  status: string | null;
  has_breakfast: boolean | null;
  has_paid: boolean | null;
  observations: string | null;
  cabin_id: number | null;
  guest_id: number | null;
}

// ===== CABIN TYPES =====
export interface CreateCabinProps {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: File | string;
}

export interface UpdateCabinProps extends CreateCabinProps {
  id: number;
}

// ===== FILTER TYPES =====
// Common filter method
export type FilterMethod = "eq" | "gte" | "lte" | "gt" | "lt";

// Status values
export type StatusValues = "checked-in" | "checked-out" | "unconfirmed";
export type StatusFilterValues = StatusValues | "all";

// Discount values
export type DiscountFilterValues = "all" | "no-discount" | "with-discount";

// Booking filters
export type BookingFilterField = "status" | "total_price";
export type BookingFilterValue<T extends BookingFilterField> =
  T extends "status" ? StatusValues : T extends "total_price" ? number : never;

export interface BookingFilter<
  T extends BookingFilterField = BookingFilterField
> {
  field: T;
  value: BookingFilterValue<T>;
  method?: FilterMethod;
}

export type BookingFilterAny =
  | BookingFilter<"status">
  | BookingFilter<"total_price">
  | null;

// Cabin filters
export type CabinFilterField = "discount" | "max_capacity" | "regular_price";
export type CabinFilterValue<T extends CabinFilterField> = T extends "discount"
  ? DiscountFilterValues
  : T extends "max_capacity"
    ? number
    : T extends "regular_price"
      ? number
      : never;

export interface CabinFilter<T extends CabinFilterField = CabinFilterField> {
  field: T;
  value: CabinFilterValue<T>;
  method?: FilterMethod;
}

export type CabinFilterAny =
  | CabinFilter<"discount">
  | CabinFilter<"max_capacity">
  | CabinFilter<"regular_price">
  | null;

// ===== SORT TYPES =====
export type CabinSortableKeys = Exclude<keyof Cabin, "id" | "image">;
export type CabinSortValues = `${CabinSortableKeys}-${"asc" | "desc"}`;

export type BookingSortableKeys = "start_date" | "total_price";
export type BookingSortableValues = "asc" | "desc";
export type BookingSorts = `${BookingSortableKeys}-${BookingSortableValues}`;

// ===== UI TYPES =====
export interface FilterOption {
  value: DiscountFilterValues | StatusFilterValues;
  label: string;
}

export interface SortOption {
  value: CabinSortValues | BookingSorts;
  label: string;
}

export type SearchOptions = "discount" | "status";

// AUTH
export interface Credentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}
