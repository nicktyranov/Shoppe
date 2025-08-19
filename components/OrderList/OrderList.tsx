'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { useRouter } from 'next/navigation';
import CustomError from '../CustomError/CustomError';
import styles from './OrderList.module.css';

export interface userOrder {
   id: number;
   userId: number;
   status: string;
   createdAt: string;
   data: Product[];
}

export interface Product {
   name: string;
   count: number;
   price: number;
}

export default function OrderList() {
   const [orders, setOrders] = useState<userOrder[] | undefined>([]);
   const { logout, isLogined, auth } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (auth?.jwt) {
         getUserOrders(auth?.jwt);
      }
   }, [auth?.jwt]);

   const getUserOrders = async (bearerCode: string) => {
      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/order/my`,
            {
               headers: {
                  Authorization: `Bearer ${bearerCode}`
               }
            }
         );
         const data: userOrder[] = await response.json();
         if (data.length > 0) {
            setOrders(data);
         }

         return data;
      } catch (error) {
         console.error('Network error:', error);
         return <CustomError text={'Network error'} />;
      }
   };

   useEffect(() => {
      if (!isLogined) {
         router.push('/user');
      }
   }, [isLogined, router]);

   return (
      <div className={styles['wrapper']}>
         <div className={styles['navigation-buttons']}>
            <p>Orders</p>
            <p onClick={() => logout()}>Logout</p>
         </div>
         <div className={styles['colums-names']}>
            <span>Order number</span>
            <span>Date</span>
            <span>Status</span>
            <span>Total</span>
         </div>
         <div className={styles['orders-wrapper']}>
            {orders &&
               orders.map((order, index) => {
                  return (
                     <div className={styles['order']} key={index}>
                        <span>{order.id}</span>
                        <span>
                           {new Intl.DateTimeFormat('en-US').format(
                              new Date(order.createdAt)
                           )}
                        </span>
                        <span>{order.status}</span>
                        <span>
                           $
                           {order.data.reduce(
                              (sum, x) => sum + x.count * x.price,
                              0
                           )}
                        </span>
                     </div>
                  );
               })}
         </div>
      </div>
   );
}
