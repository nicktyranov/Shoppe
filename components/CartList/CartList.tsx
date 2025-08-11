'use client';
import { ICartListProps } from './CartList.props';
import { useEffect, useState } from 'react';
import { IProductBySKU } from '@/interfaces/interface.bySku';
import { useCart } from '../CartContext/CartContext';
import OrderForm from '../OrderForm/OrderForm';

export default function CartList({ className, ...props }: ICartListProps) {
   const { cart } = useCart();
   const [error, setError] = useState<string | null>(null);
   const [serverData, setServerData] = useState<IProductBySKU[]>([]);

   useEffect(() => {
      const fetchAll = async () => {
         try {
            const fetchData = async (url: string): Promise<IProductBySKU> => {
               const response = await fetch(url);
               return response.json();
            };

            const requests = cart.map(
               (item) =>
                  `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/products/sku/${item.sku}`
            );

            const res: IProductBySKU[] = await Promise.all(
               requests.map(fetchData)
            );

            if (!res || res.length === 0) {
               setError('Failed to load products. Refresh page');
            }
            setServerData(res);
            setError(null);
         } catch (e) {
            setError('Failed to load products');
         }
      };
      fetchAll();
   }, [cart]);

   return (
      <div className={className} {...props}>
         {error && <p className={'error'}>{error}</p>}
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
