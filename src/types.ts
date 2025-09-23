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

export interface Settings {
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}

export type SearchOptions = "discount";

export interface FilterOption {
  value: "all" | "no-discount" | "with-discount";
  label: string;
}

export type CabinSortableKeys = Exclude<keyof Cabin, "id" | "image">;
export type SortValues = `${CabinSortableKeys}-${"asc" | "desc"}`;

export interface SortOption {
  value: SortValues;
  label: string;
}
