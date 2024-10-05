export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    sizes:        {
        name: string;
        inStock: number;
    }[];
    colors:     {
        name: string;
        class: string;
    }[]
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
