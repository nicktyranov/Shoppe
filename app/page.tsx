import Image from 'next/image';
import styles from './page.module.css';
import Select from '@/components/Select/Select';
import OnOffButton from '@/components/OnOffButton/OnOffButton';
import SliderRange from '@/components/SliderRange/SliderRange';
import Pagination from '@/components/Pagination/Pagination';
import Card from '@/components/Card/Card';

export default function Home() {
   return (
      <div className={styles.body}>
         <div className={styles.menu}>
            <Select />
            <OnOffButton />
            <SliderRange />
            <Pagination />
         </div>
         <div>
            <Card price={'20.00'} heading="Lira Earrings" />
         </div>
      </div>
   );
}
