'use client';
import { IPaginationControlsProps } from './PaginationControls.props';
import cn from 'classnames';
import styles from './PaginationControls.module.css';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationControls({
   className,
   hasNextPage,
   hasPrevPage,
   totalPages,
   per_page,
   ...props
}: IPaginationControlsProps) {
   const router = useRouter();
   const searchParams = useSearchParams();

   useEffect(() => {
      const page = searchParams.get('page')
         ? Number(searchParams.get('page'))
         : 1;
      const perPage = searchParams.get('per_page')
         ? Number(searchParams.get('per_page'))
         : per_page;

      // if (!searchParams.get('page') || !searchParams.get('per_page')) {
      //    router.push(`/shop?page=1&per_page=${perPage}`);
      // }
   }, [searchParams]);

   const page = searchParams.get('page') ?? '1';

   const buttonNumber = Math.ceil(totalPages / per_page);

   let buttonNumberArray = [];
   for (let i = 1; i <= buttonNumber; i++) {
      buttonNumberArray.push(i);
   }

   // if (!searchParams.get('page') || !searchParams.get('per_page')) {
   //    router.push(`/?page=1&per_page=1`);
   // }
   return (
      <div className={styles['pagination-list']}>
         {buttonNumberArray.map((b, i) => (
            <button
               key={i}
               className={cn(styles['pagination-list-button'], {
                  [styles.active]: Number(page) === b
               })}
               onClick={() => {
                  router.push(`/shop?page=${b}&per_page=${per_page}`);
               }}
            >
               {b}
            </button>
         ))}

         <button
            className={cn(styles['pagination-list-button'], {
               [styles.disabled]: Number(page) === buttonNumberArray.length
            })}
            onClick={() => {
               router.push(
                  `/shop?page=${Number(page) + 1}&per_page=${per_page}`
               );
            }}
         >
            &gt;
         </button>
      </div>
   );
}
