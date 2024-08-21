import { IProductBySKU } from '@/interfaces/interface.bySku';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import OrderLayout from '@/components/OrderLayout/OrderLayout';

export async function getData(id: string): Promise<IProductBySKU> {
   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api-demo/products/sku/' + id
   );
   if (!res) {
      notFound();
   }

   return await res.json();
}

export default async function Cart() {
   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>Cart</h2>

         {/* <div className={styles['products-form-wrapper']}>
            <div>
               <CartList />
            </div>

            <div className={styles['form-wrapper']}>
               <ShippingForm />
            </div>
         </div> */}
         <OrderLayout />
      </div>
   );
}
