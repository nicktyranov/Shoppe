'use client';
import { IPaginationControlsProps } from './PaginationControls.props';
import cn from 'classnames';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './PaginationControls.module.css';

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
      const perPage = searchParams.get('per_page')
         ? Number(searchParams.get('per_page'))
         : per_page;

      if (!searchParams.get('page') || !searchParams.get('per_page')) {
         router.push(`/shop?page=1&per_page=${perPage}`);
      }
   }, [searchParams, per_page, router]);

   const page = searchParams.get('page') ?? '1';

   const buttonNumber = Math.ceil(totalPages / per_page);

   let buttonNumberArray = [];
   for (let i = 1; i <= buttonNumber; i++) {
      buttonNumberArray.push(i);
   }

   return (
      <div className={styles['pagination-list']}>
         {buttonNumberArray.map((b, i) => (
            <button
               key={i}
               className={cn(styles['pagination-list-button'], {
                  [styles.active]: Number(page) === b
               })}
               onClick={() => {
                  const currentParams = new URLSearchParams(
                     searchParams.toString()
                  );
                  currentParams.set('page', b.toString());
                  router.push(`/shop?${currentParams.toString()}`);
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
               const currentParams = new URLSearchParams(
                  searchParams.toString()
               );
               currentParams.set('page', (Number(page) + 1).toString());
               router.push(`/shop?${currentParams.toString()}`);
            }}
         >
            &gt;
         </button>
      </div>
   );
}
