'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import Counter from '@/components/Counter/Counter';
import styles from './AddToCart.module.css';
import { IAddToCartProps } from './AddToCart.props';
import { useCart } from '../CartContext/CartContext';
import { useAddToCart } from '../Cart/CartFunction';

export default function AddToCart({ productSKU }: IAddToCartProps) {
   const [quantity, setQuantity] = useState(1);
   const addToCart = useAddToCart();
   const { cart } = useCart();

   useEffect(() => {
      const product = cart.find((item) => item.sku === productSKU);
      if (product) {
         setQuantity(product.amount);
      }
   }, [cart, productSKU]);

   // const addToCart = () => {
   //    const currentCart = [...cart];
   //    const productIndex = currentCart.findIndex(
   //       (item) => item.sku === productSKU
   //    );
   //    const newEntry = { sku: productSKU, amount: quantity };

   //    if (productIndex !== -1) {
   //       currentCart[productIndex] = newEntry;
   //    } else {
   //       currentCart.push(newEntry);
   //    }

   //    updateCart(currentCart);
   //    console.log(`Added to cart: SKU - ${productSKU}, Amount - ${quantity}`);
   // };
   return (
      <div className={styles['buttons']}>
         <Counter
            className={styles['button']}
            amount={quantity}
            onChange={setQuantity}
         />
         <Button
            text="Add to the cart"
            className={styles['button']}
            onClick={() => addToCart({ productSKU, quantity })}
         />
      </div>
   );
}
