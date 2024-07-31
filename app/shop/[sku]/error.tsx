'use client';
import Button from '@/components/Button/Button';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

export default function Error({ error, reset }) {
   useEffect(() => {
      console.error(error);
   }, [error]);

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
