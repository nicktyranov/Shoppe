import { Dispatch, SetStateAction } from 'react';

export interface IShippingFormProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   className?: string;
   isLogined?: boolean;
   setIsOrderSuccess: Dispatch<SetStateAction<boolean>>;
}
