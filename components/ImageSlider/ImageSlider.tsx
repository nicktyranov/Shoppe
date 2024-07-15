'use client';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
register();
import img1 from './Img1.png';
import img2 from './Img2.png';
import Image from 'next/image';
import styles from './ImageSlider.module.css';
import Link from 'next/link';

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
            <swiper-slide>
               <div className={styles['slide-image']}>
                  <div className={styles['slide-info']}>
                     <p className={styles['slide-text']}>Gold big hoops</p>
                     <span>$58,00</span>
                     <Link href={'/shop'}>
                        <button className={styles['slide-button']}>
                           {' '}
                           WATCH
                        </button>
                     </Link>
                  </div>
                  <Image
                     src={img1}
                     alt="Gold big hoops image"
                     className={styles.img}
                  />
               </div>
            </swiper-slide>

            <swiper-slide>
               <div className={styles['slide-image']}>
                  <div className={styles['slide-info']}>
                     <p className={styles['slide-text']}>Diamond jewelry</p>
                     <span>$69,00</span>
                     <Link href={'/shop'}>
                        <button className={styles['slide-button']}>
                           {' '}
                           WATCH
                        </button>
                     </Link>
                  </div>
                  <Image
                     src={img2}
                     alt="Diamond jewelry image"
                     className={styles.img}
                  />
               </div>
            </swiper-slide>

            <swiper-slide>
               <div className={styles['slide-image']}>
                  <div className={styles['slide-info']}>
                     <p className={styles['slide-text']}>Gold big hoops</p>
                     <span>$58,00</span>
                     <Link href={'/shop'}>
                        <button className={styles['slide-button']}>
                           {' '}
                           WATCH
                        </button>
                     </Link>
                  </div>
                  <Image
                     src={img1}
                     alt="Gold big hoops image"
                     className={styles.img}
                  />
               </div>
            </swiper-slide>

            <swiper-slide>
               <div className={styles['slide-image']}>
                  <div className={styles['slide-info']}>
                     <p className={styles['slide-text']}>Diamond jewelry</p>
                     <span>$69,00</span>
                     <Link href={'/shop'}>
                        <button className={styles['slide-button']}>
                           {' '}
                           WATCH
                        </button>
                     </Link>
                  </div>
                  <Image
                     src={img2}
                     alt="Diamond jewelry image"
                     className={styles.img}
                  />
               </div>
            </swiper-slide>

            <swiper-slide>
               <div className={styles['slide-image']}>
                  <div className={styles['slide-info']}>
                     <p className={styles['slide-text']}>Gold big hoops</p>
                     <span>$58,00</span>
                     <Link href={'/shop'}>
                        <button className={styles['slide-button']}>
                           {' '}
                           WATCH
                        </button>
                     </Link>
                  </div>
                  <Image
                     src={img1}
                     alt="Gold big hoops image"
                     className={styles.img}
                  />
               </div>
            </swiper-slide>

            <swiper-slide>
               <div className={styles['slide-image']}>
                  <div className={styles['slide-info']}>
                     <p className={styles['slide-text']}>Diamond jewelry</p>
                     <span>$69,00</span>
                     <Link href={'/shop'}>
                        <button className={styles['slide-button']}>
                           {' '}
                           WATCH
                        </button>
                     </Link>
                  </div>
                  <Image
                     src={img2}
                     alt="Diamond jewelry image"
                     className={styles.img}
                  />
               </div>
            </swiper-slide>
         </swiper-container>
      </div>
   );
}
