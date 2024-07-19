'use client';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import img1 from './Img1.png';
import img2 from './Img2.png';
import Image, { StaticImageData } from 'next/image';
import styles from './ImageSlider.module.css';
import Link from 'next/link';

register();

type ImageData = {
   id: number;
   name: string;
   price: string | number;
   img: StaticImageData;
};

const data: ImageData[] = [
   {
      id: 1,
      name: 'Gold big hoops',
      price: '$58,00',
      img: img1
   },
   {
      id: 2,
      name: 'Diamond jewelry',
      price: '$69,00',
      img: img2
   },
   {
      id: 3,
      name: 'Gold big hoops',
      price: '$58,00',
      img: img1
   },
   {
      id: 4,
      name: 'Diamond jewelry',
      price: '$69,00',
      img: img2
   }
];

export default function ImageSlider() {
   const swiperElRef = useRef<any>(null);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleInit = () => {
         if (containerRef.current) {
            containerRef.current.classList.add(styles.initiated);
         }
      };

      if (swiperElRef.current) {
         swiperElRef.current.addEventListener('progress', (e: any) => {
            const [swiper, progress] = e.detail;
            console.log(progress);
         });

         swiperElRef.current.addEventListener('slidechange', (e: any) => {
            console.log('slide changed');
         });

         swiperElRef.current.addEventListener('init', handleInit);

         // Ensure Swiper is initialized
         if (swiperElRef.current.swiper) {
            handleInit();
         }
      }
   }, []);

   return (
      <div className={styles['swiper-wrapper']} ref={containerRef}>
         <swiper-container
            ref={swiperElRef}
            slides-per-view="1"
            autoPlay="true"
            pagination='{
               "clickable": true
            }'
            style={{
               '--swiper-pagination-color': '#FFF',
               '--swiper-pagination-bullet-inactive-color': '#a18a68',
               '--swiper-pagination-bullet-inactive-opacity': '1',
               '--swiper-pagination-bullet-size': '12px',
               '--swiper-pagination-bullet-horizontal-gap': '5px'
            }}
         >
            {data.map((el) => {
               return (
                  <swiper-slide key={el.id}>
                     <div className={styles['slide-image']}>
                        <div className={styles['slide-info']}>
                           <p className={styles['slide-text']}>{el.name}</p>
                           <span>{el.price}</span>
                           <Link href={'/shop'}>
                              <button className={styles['slide-button']}>
                                 WATCH
                              </button>
                           </Link>
                        </div>
                        <Image
                           src={el.img}
                           alt={el.name + 'image'}
                           className={styles.img}
                           priority={true}
                        />
                     </div>
                  </swiper-slide>
               );
            })}
         </swiper-container>
      </div>
   );
}
