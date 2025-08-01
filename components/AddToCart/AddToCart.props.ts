import { IProductBySKU } from '@/interfaces/interface.bySku';

export interface IAddToCartProps {
   productName: string;
   productPrice: number;
   productSKU: string;
   data?: IProductBySKU;
}
