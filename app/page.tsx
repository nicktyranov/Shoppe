import Image from 'next/image';
import styles from './page.module.css';
import Select from '@/components/Select/Select';
import OnOffButton from '@/components/OnOffButton/OnOffButton';
import SliderRange from '@/components/SliderRange/SliderRange';
import Pagination from '@/components/Pagination/Pagination';

export default function Home() {
   return (
      <div className={styles.menu}>
         <Select />
         <OnOffButton />
         <SliderRange />
         <Pagination />
      </div>
   );
}
