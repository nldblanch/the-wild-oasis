export interface Cabin {
    id: number;
    created_at: string;
    name: string | null;
    max_capacity: number | null;
    regular_price: number | null;
    discount: number | null;
    description: string | null;
    image: string | null;
}

export interface CreateCabinProps {
    name: string;
    max_capacity: number;
    regular_price: number;
    discount: number;
    description: string;
    image: File;
}