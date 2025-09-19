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