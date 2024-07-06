export interface IProductList {
   totalProducts: number;
   limit: number;
   offset: number;
   products: IProduct[];
}

export interface IProduct {
   name: string;
   price: number;
   discount?: number;
   description: string;
   images: string[];
   categoryId: number;
   sku: number;
   reviews: Review[];
}

export interface Review {
   name: string;
   rating: number;
   date: string;
   description: string;
}

export interface IGetProducts {
   limit: number;
   offset: number;
   discounted?: boolean;
   name?: string;
   priceMin?: number;
   priceMax?: number;
   categoryId?: number | null;
}
