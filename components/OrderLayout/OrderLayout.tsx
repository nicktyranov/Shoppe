'use client';
import { IOrderLayoutProps } from './OrderLayout.props';
import cn from 'classnames';
import icon from './icon-success.svg';
import CartList from '../CartList/CartList';
import ShippingForm from '../ShippingForm/ShippingForm';
import { OrderData, useOrders } from '../OrdersContext/OrdersContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '../CartContext/CartContext';
import Link from 'next/link';
import Button from '../Button/Button';
import styles from './OrderLayout.module.css';

export default function OrderLayout({ className }: IOrderLayoutProps) {
   const { orders } = useOrders();
   const [currentOrder, setCurrentOrder] = useState<OrderData>();
   const [isOrderSuccess, setIsOrderSuccess] = useState(false);
   const { cart, updateCart, totalCost } = useCart();

   let totalOrderCost = 0;
   if (currentOrder) {
      totalOrderCost = currentOrder.data.reduce(
         (sum, x) => sum + x.price * x.amount,
         0
      );
   }

   useEffect(() => {
      if (orders.length > 0) {
         const newOrder = orders.at(-1);
         setCurrentOrder(newOrder);
      }
   }, [orders]);

   useEffect(() => {
      if (isOrderSuccess) {
         setTimeout(() => {
            updateCart([]);
         }, 1000);
      }
   }, [isOrderSuccess, updateCart]);

   if (cart.length < 1 && !isOrderSuccess) {
      return (
         <div className={styles['empty-cart']}>
            <p>¯\_(ツ)_/¯</p>
            <p>Cart is empty, choose and add something there</p>
            <Link href="/shop">
               <Button text="shop" className={styles.button} />
            </Link>
         </div>
      );
   }

   return (
      <div>
         {!isOrderSuccess && (
            <div className={cn(styles['products-form-wrapper'])}>
               <div>
                  <CartList />
               </div>

               <div className={styles['form-wrapper']}>
                  <ShippingForm setIsOrderSuccess={setIsOrderSuccess} />
               </div>
            </div>
         )}

         {isOrderSuccess && (
            <div className={styles['order']}>
               <div className={styles['banner']}>
                  <Image src={icon} alt="icon" width={20} height={20} />
                  <p>We recieved your order</p>
               </div>
               <div className={styles['order-information']}>
                  <div>
                     <h2>Order Details</h2>
                     <div className={styles['info-order-wrapper']}>
                        <div>
                           <p className={styles['info-element']}>
                              <span>Order Number</span>
                              <span>{currentOrder?.id}</span>
                           </p>
                           <p className={styles['info-element']}>
                              <span>Order date</span>
                              <span>
                                 {new Intl.DateTimeFormat('en-US').format(
                                    Date.now()
                                 )}
                              </span>
                           </p>
                           <p className={styles['info-element']}>
                              <span>Name</span>
                              <span>{currentOrder?.username}</span>
                           </p>
                        </div>

                        <div>
                           <p className={styles['info-element']}>
                              <span>Email</span>
                              <span>{currentOrder?.email}</span>
                           </p>
                           <p className={styles['info-element']}>
                              <span>Shipping address</span>
                              <span>{currentOrder?.address}</span>
                           </p>
                           <p className={styles['info-element']}>
                              <span>Phone number</span>
                              <span>{currentOrder?.mobileNumber}</span>
                           </p>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h2>Order Content</h2>
                     <div className={styles['product-content']}>
                        <div
                           className={cn(
                              styles['product-content-element'],
                              styles['product-content-heading']
                           )}
                        >
                           <span>Products</span>
                           <span>Amount</span>
                           <span>Total</span>
                        </div>
                        <div className={styles['product-list']}>
                           {currentOrder &&
                              currentOrder.data.map((el, index) => {
                                 return (
                                    <div
                                       className={
                                          styles['product-content-element']
                                       }
                                       key={index}
                                    >
                                       <span>{el.name}</span>
                                       <span>{el.amount}</span>
                                       <span>${el.amount * el.price}</span>
                                    </div>
                                 );
                              })}
                        </div>
                        <div
                           className={cn(
                              styles['product-content-element'],
                              styles['product-content-summary']
                           )}
                        >
                           <span>Total</span>
                           <span></span>
                           <span>${totalCost}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
