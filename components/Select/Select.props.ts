import { Category } from '@/interfaces/interface.filter';

export interface ISelectProps
   extends React.SelectHTMLAttributes<HTMLInputElement> {
   className?: string;
   categories: Category[];
}
