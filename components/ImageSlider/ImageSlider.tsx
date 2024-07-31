'use client';
import { useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/bundle';
import './swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from './Img1.png';
import img2 from './Img2.png';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './ImageSlider.module.css';

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
   },
   {
      id: 5,
      name: 'Gold big hoops',
      price: '$58,00',
      img: img1
   },
   {
      id: 6,
      name: 'Diamond jewelry',
      price: '$69,00',
      img: img2
   }
];

export default function ImageSlider() {
   const extraModules = [Pagination, Autoplay]; // добавляем к слайдеру пагинацию и Autoplay
   const allowTouchMove = true;

   const pagination = {
      clickable: true,

      renderBullet: function (index: number, className: string) {
         return `<span class=${className}></span>`;
      }
   };

   const [, setInit] = useState(false);

   return (
      <>
         <Swiper
            className={styles['swiper-wrapper']}
            allowTouchMove={allowTouchMove}
            modules={extraModules}
            pagination={pagination}
            onInit={() => setInit(true)}
            slidesPerView={1}
            autoplay={{
               delay: 4000
            }}
         >
            {data.map((el) => (
               <SwiperSlide key={el.id}>
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
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   );
}
