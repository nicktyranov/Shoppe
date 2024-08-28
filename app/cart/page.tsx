import styles from './page.module.css';
import OrderLayout from '@/components/OrderLayout/OrderLayout';

export default async function Cart() {
   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>Cart</h2>
         <OrderLayout />
      </div>
   );
}
