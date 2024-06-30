import Image from 'next/image';
import styles from './page.module.css';
import Select from '@/components/Select/Select';
import OnOffButton from '@/components/OnOffButton/OnOffButton';
import SliderRange from '@/components/SliderRange/SliderRange';
import Pagination from '@/components/Pagination/Pagination';
import Card from '@/components/Card/Card';
import Search from '@/components/Search/Search';
import { IFilter } from '@/interfaces/interface.filter';

async function getFilter(): Promise<IFilter> {
   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + `/api-demo/products/get-filter`
   );
   return await res.json();
}

export default async function Home() {
   const filter = await getFilter();

   const categoryTranslations: Record<string, string> = {
      Заколки: 'Hairpins',
      Серьги: 'Earrings',
      Кулоны: 'Pendants'
   };

   const translatedCategories = filter.categories.map((category) => ({
      id: category.id,
      name: categoryTranslations[category.name] || category.name
   }));

   return (
      <div>
         <h1 className={styles.h1}>Каталог товаров</h1>
         <div className={styles.body}>
            <div className={styles.filter}>
               <Search isClicked={true} className={styles['search-filter']} />
               <Select categories={translatedCategories} />
               <OnOffButton />
               <SliderRange min={filter.minPrice} max={filter.maxPrice} />
               <Pagination />
            </div>
            <div>
               <Card price={'20.00'} heading="Lira Earrings" />
            </div>
         </div>
      </div>
   );
}
