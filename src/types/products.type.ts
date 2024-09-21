export interface Product {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
    rating:      Rating;
}

export interface IDiscount {
    id: number;
    discount: number;
}

export interface Rating {
    rate:  number;
    count: number;
}
