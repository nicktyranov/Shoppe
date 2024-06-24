'use client';
import { ICartProps } from './Cart.props';
import cartIcon from './cart-icon.svg';
import styles from './Cart.module.css';
import Image from 'next/image';
import cn from 'classnames';

export default function Cart({ amount }: ICartProps) {
   return (
      <div className={styles.wrapper}>
         <Image src={cartIcon} alt="cart icon" height={21} width={21}></Image>
         <span
            className={cn({
               [styles['empty-cart']]: !amount,
               [styles['cart']]: amount
            })}
         >
            {amount}
         </span>
      </div>
   );
}
