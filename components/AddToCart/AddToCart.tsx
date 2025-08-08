'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import Counter from '@/components/Counter/Counter';
import { IAddToCartProps } from './AddToCart.props';
import { CartItem, useCart } from '../CartContext/CartContext';
import { useAddToCart } from '../Cart/CartFunction';
import cn from 'classnames';
import styles from './AddToCart.module.css';

export default function AddToCart({
   productName,
   productSKU,
   productPrice,
   data
}: IAddToCartProps) {
   const addToCart = useAddToCart();
   const { cart, updateCart } = useCart();
   const [quantity, setQuantity] = useState(
      cart.find((item) => item.sku === productSKU)?.amount || 1
   );

   const previousCartRef = useRef<CartItem[]>(cart);

   const handleQuantityChange = (newQuantity: number) => {
      setQuantity(newQuantity);
      if (data) {
         const updatedCart = cart.map((item) =>
            item.sku === data.sku.toString()
               ? { ...item, amount: newQuantity }
               : item
         );
         if (
            JSON.stringify(updatedCart) !==
            JSON.stringify(previousCartRef.current)
         ) {
            updateCart(updatedCart);
            previousCartRef.current = updatedCart;
         }
      }
   };

   useEffect(() => {
      const product = cart.find((item) => item.sku === productSKU);
      if (product) {
         setQuantity(product.amount);
      }
   }, [cart, productSKU]);

   return (
      <div className={styles['buttons']}>
         <Counter
            className={styles['button']}
            amount={quantity}
            onChange={handleQuantityChange}
            data-testid="add-to-cart-counter"
         />
         <Button
            text="Add to the cart"
            className={cn(styles['button'], styles['cart-btn'])}
            onClick={() =>
               addToCart({
                  productSKU,
                  quantity,
                  price: productPrice,
                  name: productName
               })
            }
            data-testid="add-to-cart-button"
         />
      </div>
   );
}
