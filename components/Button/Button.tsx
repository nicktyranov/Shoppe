'use client';
import { IButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';

export const addToCart = () => {
   console.log('add to cart');
};

export default function Button({
   text,
   productPage,
   className,
   ...props
}: IButtonProps) {
   if (productPage) {
      return (
         <button
            className={cn(styles['button'], className)}
            {...props}
            onClick={() => addToCart()}
         >
            {text}
         </button>
      );
   }
   return (
      <button className={cn(styles['button'], className)} {...props}>
         {text}
      </button>
   );
}
