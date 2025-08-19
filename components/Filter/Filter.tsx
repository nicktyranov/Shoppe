'use client';
import { IFilterProps } from './Filter.props';
import cn from 'classnames';
import OnOffButton from '../OnOffButton/OnOffButton';
import Search from '../Search/Search';
import Select from '../Select/Select';
import SliderRange from '../SliderRange/SliderRange';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { IFilter } from '@/interfaces/interface.filter';
import styles from './Filter.module.css';

const FILTER_STORAGE_KEY = 'shoppe_filterState';

async function getFilter(): Promise<IFilter> {
   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api-demo/products/get-filter'
   );
   return await res.json();
}

export default function Filter({ className, ...props }: IFilterProps) {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const [filter, setFilter] = useState<IFilter>();
   const [toggleButton, setToggleButton] = useState(false);
   const [, setSelectedCategory] = useState<number>();
   const [minPrice, setMinPrice] = useState(0);
   const [maxPrice, setMaxPrice] = useState(0);

   useEffect(() => {
      const storedFilter = localStorage.getItem(FILTER_STORAGE_KEY);
      if (storedFilter) {
         const parsedFilter = JSON.parse(storedFilter);
         setFilter(parsedFilter);
         setMinPrice(parsedFilter.minPrice);
         setMaxPrice(parsedFilter.maxPrice);
      } else {
         const fetchFilter = async () => {
            const data = await getFilter();
            setFilter(data);
            setMinPrice(data.minPrice);
            setMaxPrice(data.maxPrice);

            localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(data));
         };
         fetchFilter();
      }
   }, []);

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

   useEffect(() => {
      toggleButton &&
         router.push(pathname + '?' + createQueryString('discounted', 'true'));
      !toggleButton &&
         router.push(pathname + '?' + createQueryString('discounted', ''));
   }, [toggleButton, router, pathname, createQueryString]);

   const handleSelect = useCallback(
      (id: string) => {
         const categoryId = parseInt(id, 10);
         setSelectedCategory(categoryId);
         router.push(pathname + '?' + createQueryString('categoryId', id));
      },
      [router, pathname, createQueryString]
   );

   const handleSliderChange = useCallback(
      (values: [number, number]) => {
         setMinPrice(values[0]);
         setMaxPrice(values[1]);
         const params = new URLSearchParams(searchParams.toString());
         params.set('priceMin', values[0].toString());
         params.set('priceMax', values[1].toString());

         router.push(pathname + '?' + params.toString());
      },
      [router, pathname, searchParams]
   );

   const getCurrentUrlWithParams = useCallback(() => {
      return `${pathname}?${searchParams.toString()}`;
   }, [searchParams, pathname]);

   const handleFilterChange = () => {
      let _url = getCurrentUrlWithParams();
   };

   const categoryTranslations: Record<string, string> = {
      Заколки: 'Hairpins',
      Серьги: 'Earrings',
      Кулоны: 'Pendants'
   };

   if (!filter) {
      return <div className={styles['filter']}>Loading...</div>;
   }

   const translatedCategories = filter.categories.map((category) => ({
      id: category.id,
      name: categoryTranslations[category.name] || category.name
   }));

   return (
      <div
         className={cn(styles['filter'], className)}
         {...props}
         onChange={handleFilterChange}
      >
         <Search isClicked={true} className={styles['search-filter']} />
         <Select
            categories={translatedCategories}
            onChange={(id) => handleSelect(id)}
         />
         <OnOffButton
            onClick={() => {
               setToggleButton((prevState) => !prevState);
            }}
         />
         <SliderRange
            min={filter.minPrice}
            max={filter.maxPrice}
            onChange={handleSliderChange}
            value={[minPrice, maxPrice]}
         />
      </div>
   );
}
