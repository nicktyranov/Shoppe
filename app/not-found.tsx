import Button from '@/components/Button/Button';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
   return (
      <div className={styles.wrapper}>
         <h2>Error 404</h2>
         <p>Page not found, try going to the main page</p>
         <Link href="/">
            <Button text="main page" className={styles.button} />
         </Link>
      </div>
   );
}
