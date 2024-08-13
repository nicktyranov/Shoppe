'use client';
import { ICartListProps } from './CartList.props';
import cn from 'classnames';
import styles from './CartList.module.css';
import { useEffect, useState } from 'react';
import { IProductBySKU } from '@/interfaces/interface.bySku';
import { notFound } from 'next/navigation';
import { useCart } from '../CartContext/CartContext';
import OrderForm from '../OrderForm/OrderForm';
import Link from 'next/link';
import Button from '../Button/Button';

export default function CartList({ className, ...props }: ICartListProps) {
   const { cart } = useCart();
   const [data, setData] = useState(cart);
   const [serverData, setServerData] = useState<IProductBySKU[]>();

   useEffect(() => {
      setData(cart);
   }, [cart]);

   useEffect(() => {
      const fetchAll = async () => {
         try {
            const fetchData = async (url: string): Promise<IProductBySKU> => {
               const response = await fetch(url);
               return response.json();
            };

            const makeRequests = () => {
               const requests = [];
               for (let i = 0; i < data.length; i++) {
                  console.log(data[i]);
                  requests.push(
                     process.env.NEXT_PUBLIC_DOMAIN +
                        '/api-demo/products/sku/' +
                        data[i].sku
                  );
               }
               return requests;
            };
            const requests = makeRequests();

            const res: IProductBySKU[] = await Promise.all(
               requests.map(fetchData)
            );

            if (!res) {
               notFound();
            }
            setServerData(res);
         } catch (e) {
            console.log(e);
            console.error(e);
         }
      };
      fetchAll();
   }, [data]);

   if (cart.length < 1) {
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
      <div className={cn(styles['wrapper'], className)} {...props}>
         {serverData &&
            serverData.map((item) => {
               let amountValue = 1;
               cart.map((el) =>
                  el.sku === item.sku.toString()
                     ? (amountValue = el.amount)
                     : ''
               );
               return (
                  <OrderForm key={item.sku} data={item} amount={amountValue} />
               );
            })}
      </div>
   );
}
