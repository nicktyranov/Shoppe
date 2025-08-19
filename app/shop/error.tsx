'use client';
import Button from '@/components/Button/Button';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

type ErrorProps = {
   error: Error;
};

export default function Error({ error }: ErrorProps) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className={styles.wrapper}>
         <h2>Error 404</h2>
         <p>
            {error.message === 'Unexpected end of JSON input'
               ? 'Page not found, try going to the main page'
               : error.message}
         </p>
         <Link href="/">
            <Button text="main page" className={styles.button} />
         </Link>
      </div>
   );
}
