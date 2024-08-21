'use client';
import cartIcon from './cart-icon.svg';
import Image from 'next/image';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useCart } from '../CartContext/CartContext';
import styles from './Cart.module.css';

export default function Cart() {
   const [amount, setAmount] = useState(0);
   const { cart } = useCart();

   useEffect(() => {
      if (!cart) {
         setAmount(0);
      } else {
         setAmount(cart.length);
      }
   }, [cart]);

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
