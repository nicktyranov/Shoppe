import { IReview } from '@/interfaces/interface.bySku';

export interface IRatingProps
   extends React.HtmlHTMLAttributes<HTMLInputElement> {
   className?: string;
   reviews?: IReview[];
   isEditable?: boolean;
   reviewsSummary?: boolean;
   value?: number;
   shareRating?(num: number): void;
}
