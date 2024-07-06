'use client';
import { IImageSliderProps } from './ImageSlider.props';
import Image, { StaticImageData } from 'next/image';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import img1 from './Img1.png';
import img2 from './Img2.png';
import 'rc-slider/assets/index.css';
import styles from './ImageSlider.module.css';

const TOTAL_DOTS = 8;

export default function ImageSlider({
   className,
   width,
   height = '646px',
   autoPlay,
   autoPlayTime
}: IImageSliderProps) {
   const [items, setItems] = useState<StaticImageData[]>([]);
   const [slide, setSlide] = useState(0);
   const [touchPosition, setTouchPosition] = useState<number | null>(null);

   useEffect(() => {
      setItems([img1, img2]);
      setSlide(0);
   }, []);

   const changeSlide = (direction = 1) => {
      let sliderNumber = 0;

      if (slide + direction < 0) {
         sliderNumber = TOTAL_DOTS - 1;
      } else {
         sliderNumber = (slide + direction) % TOTAL_DOTS;
      }
      // console.log(
      //    `changeSlide: cменили слайд на ${sliderNumber}, ${typeof sliderNumber} `
      // );
      setSlide(sliderNumber);
   };

   const goToSlide = (number: number) => {
      setSlide(number);
      // console.log(`cменили слайд на ${number}, ${typeof number} `);
   };

   const handleTouchStart = (e: React.TouchEvent) => {
      const touchDown = e.touches[0].clientX;
      setTouchPosition(touchDown);
   };

   const handleTouchMove = (e: React.TouchEvent) => {
      if (touchPosition === null) {
         return;
      }

      const currentPosition = e.touches[0].clientX;
      const direction = touchPosition - currentPosition;

      if (direction > 10) {
         changeSlide(1);
      } else if (direction < -10) {
         changeSlide(-1);
      }

      setTouchPosition(null);
   };

   useEffect(() => {
      if (!autoPlay) {
         return;
      }
      if (!autoPlayTime) {
         autoPlayTime = 5000000;
      }
      const interval = setInterval(() => {
         changeSlide(1);
      }, autoPlayTime);

      return () => {
         clearInterval(interval);
      };
   }, [slide]);

   function Dots() {
      const renderDots = () => {
         const dots = [];
         for (let i = 0; i < TOTAL_DOTS; i++) {
            dots.push(
               <button
                  key={`dot-${i}`}
                  onClick={() => goToSlide(i)}
                  className={cn(styles.dot, {
                     [styles['active-dot']]: i === slide
                  })}
                  disabled={i === slide}
               />
            );
         }
         return dots;
      };
      return <div className={styles['dots-wrapper']}>{renderDots()}</div>;
   }

   function Slides() {
      const text1 = 'Diamond jewelry';
      const price1 = '$69,00';
      const text2 = 'Gold big hoops';
      const price2 = '$58,00';

      return (
         <div
            className={styles['slide-list']}
            style={{
               transform: `translateX(-${(slide % items.length) * 100}%)`
            }}
         >
            {items.map((item, index) => (
               <div key={index} className={styles['slide-image']}>
                  <div className={styles['slide-info']}>
                     <p className={styles['slide-text']}>
                        {index % 2 === 0 ? text2 : text1}
                     </p>
                     <span>{index % 2 === 0 ? price2 : price1}</span>
                     <button className={styles['slide-button']}>
                        WATCH MORE
                     </button>
                  </div>
                  <Image
                     src={item.src}
                     alt={`item-${index}`}
                     className={styles.image}
                     width={1248}
                     height={646}
                     priority
                  />
               </div>
            ))}
         </div>
      );
   }

   return (
      <div className={cn(styles['slider-wrapper'], styles['centered-block'])}>
         <div
            style={{ width, height }}
            className={cn(styles.slider, className)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
         >
            <Slides />
            <Dots />
         </div>
      </div>
   );
}
