import { Category } from '@/interfaces/interface.filter';

export interface ISelectProps {
   className?: string;
   categories: Category[];
   onChange?: (id: string) => void; // Уточняем тип onChange
}
