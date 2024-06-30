export interface IFilter {
   categories: Category[];
   maxPrice: number;
   minPrice: number;
}

export interface Category {
   id: number;
   name: string;
}
