export interface ICardProps {
   discount?: string | number;
   isLiked?: boolean;
   soldOut?: boolean;
   img?: string;
   heading: string;
   price: string | number;
   id?: string;
   main: boolean;
   className?: string;
}
