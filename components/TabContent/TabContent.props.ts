import { IReview } from '@/interfaces/interface.bySku';

export interface ITabContentProps {
   className?: string;
   description: string;
   reviews: IReview[];
   sku: number;
}
