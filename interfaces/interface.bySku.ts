export interface IProductBySKU {
   name: string;
   price: number;
   description: string;
   images: string[];
   categoryId: number;
   sku: number;
   reviews: IReview[];
}

export interface IReview {
   name: string;
   rating: number;
   date: string;
   description: string;
}
