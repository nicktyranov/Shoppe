'use client';
import { IPaginationProps } from './Pagination.props';
import cn from 'classnames';
import styles from './Pagination.module.css';
import { useState } from 'react';

export default function Pagination({ className, ...props }: IPaginationProps) {
   let items = [1, 2, 3, 4, 5];

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 3;

   const totalPages = Math.ceil(items.length / itemsPerPage);

   const handleClick = (page: number) => {
      setCurrentPage(page);
   };

   const handleNext = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   const currentItems = items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   return (
      <div className={styles.pagination}>
         <ul>
            {currentItems.map((item, index) => (
               <li key={index}>{item}</li>
            ))}
         </ul>
         <div className={styles['pagination-list']}>
            {[...Array(totalPages)].map((_, index) => (
               <button
                  key={index}
                  onClick={() => handleClick(index + 1)}
                  className={styles['pagination-list-button']}
               >
                  {index + 1}
               </button>
            ))}
            <button
               onClick={handleNext}
               className={cn(
                  styles['pagination-list-button'],
                  styles['pagination-next-button'],
                  {
                     [styles.disabled]: currentPage === totalPages
                  }
               )}
               disabled={currentPage === totalPages}
            >
               &gt;
            </button>
         </div>
      </div>
   );
}
