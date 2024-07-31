import { IProductList } from '@/interfaces/interface.products';

export interface IPaginationControlsProps {
   className?: string;
   // totalItems: number;
   // itemsPerPage: number;
   // currentPage: number;
   // itemsNumber: number;
   // data: IProductList;
   hasNextPage: boolean;
   hasPrevPage: boolean;
   totalPages: number;
   per_page: number;
}
