'use client';
import { ISearchProps } from './Search.props';
import Image from 'next/image';
import searchIcon from './search-icon.svg';
import searchIcon2 from './search-icon-grey.svg';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './Search.module.css';

export default function Search({
   isClicked,
   className,
   ...props
}: ISearchProps) {
   const [clicked, setClicked] = useState(isClicked);
   const [inputSearch, setInputSearch] = useState('');
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const click = (e: MouseEvent) => {
      console.log('Нажато');
      setClicked(true);
   };

   useEffect(() => {
      console.log(`inputSearch - ${inputSearch}`);
   }, [inputSearch]);

   const createQueryString = useCallback(
      (name: string, value: string) => {
         const params = new URLSearchParams(searchParams.toString());
         if (value) {
            params.set(name, value);
         } else {
            params.delete(name);
         }
         return params.toString();
      },
      [searchParams]
   );

   const handleInputQuery = () => {
      inputSearch &&
         router.push(pathname + '?' + createQueryString('name', inputSearch));
      !inputSearch &&
         router.push(pathname + '?' + createQueryString('name', ''));
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         console.log(`Enter clicked: input - ${inputSearch}`);
         handleInputQuery();
      }
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
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.currentTarget.value)}
                  onKeyDown={handleKeyDown}
               />
               <div>
                  <Image
                     src={searchIcon2}
                     alt="search icon"
                     className={styles['icon-input']}
                     height={12}
                     width={12}
                  />
               </div>
            </div>
         )}
      </div>
   );
}
