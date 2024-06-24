'use client';
import { ISearchProps } from './Search.props';
import styles from './Search.module.css';
import Image from 'next/image';
import searchIcon from './search-icon.svg';
import searchIcon2 from './search-icon-grey.svg';
import { MouseEvent, useState } from 'react';
import cn from 'classnames';

export default function Search({
   isClicked,
   className,
   ...props
}: ISearchProps) {
   const [clicked, setClicked] = useState(isClicked);

   const click = (e: MouseEvent) => {
      console.log('Нажато');
      setClicked(!clicked);
   };

   return (
      <div
         onClick={(e) => click(e)}
         className={cn(styles.wrapper, className)}
         {...props}
      >
         <Image
            src={searchIcon}
            alt="search icon"
            className={cn('styles.icon', {
               [styles['icon-clicked']]: clicked
            })}
            height={19}
            width={19}
         />
         {clicked && (
            <div
               className={cn(styles['input-wrapper'], {
                  [styles['input-wrapper-animated']]: clicked
               })}
            >
               <input
                  className={styles.input}
                  type="text"
                  placeholder="Поиск"
               />
               <Image
                  src={searchIcon2}
                  alt="search icon"
                  className={styles['icon-input']}
                  height={12}
                  width={12}
               />
            </div>
         )}
      </div>
   );
}
