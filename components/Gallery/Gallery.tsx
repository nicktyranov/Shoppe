'use client';
import { IGalleryProps } from './Gallery.props';
import cn from 'classnames';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

export default function Gallery({
   images,
   alt,
   width,
   className,
   ...props
}: IGalleryProps) {
   const [pic, setPic] = useState('');
   const [activePic, setActivePic] = useState(0);
   const [activePreview, setActivePreview] = useState(0);
   const previewsRef = useRef<HTMLDivElement>(null);
   const sliderWrapperRef = useRef<HTMLDivElement>(null);
   const [sliderWidth, setSliderWidth] = useState(0);
   const touchStartX = useRef(0);
   const touchEndX = useRef(0);

   const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
   };

   const handleTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.targetTouches[0].clientX;
   };

   const handleTouchEnd = () => {
      const diff = touchEndX.current - touchStartX.current;
      if (diff > 50) {
         setActivePic((prevActivePic) =>
            Math.min(prevActivePic + 1, images.length - 1)
         );
      } else if (diff < -50) {
         setActivePic((prevActivePic) => Math.max(prevActivePic - 1, 0));
      }
   };

   useEffect(() => {
      if (images.length > 0) {
         setPic(images[0]);
      }
   }, [images]);

   useEffect(() => {
      setPic(images[activePic]);
      setActivePreview(activePic);
   }, [activePic, images]);

   const scrollToActivePreview = useCallback(() => {
      if (previewsRef.current) {
         const activeElement = previewsRef.current.children[activePreview];
         const activeElementOffsetTop = (activeElement as HTMLElement)
            .offsetTop;
         const activeElementHeight = (activeElement as HTMLElement)
            .clientHeight;

         let scrollPosition;
         if (activePreview !== 0) {
            scrollPosition = activeElementOffsetTop - activeElementHeight;
         } else {
            scrollPosition = 0;
         }

         previewsRef.current.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
         });
      }
   }, [activePreview]);

   useEffect(() => {
      scrollToActivePreview();
   }, [activePreview, scrollToActivePreview]);

   const handleImgClick = (e: MouseEvent) => {
      const index = Number(e.currentTarget.id);
      setActivePic(index);
   };

   useEffect(() => {
      const timeout = setTimeout(() => {
         if (sliderWrapperRef.current) {
            setSliderWidth(sliderWrapperRef.current.offsetWidth);
         }
      }, 200);
      return () => clearTimeout(timeout);
   }, []);

   let activeSliderWidth = sliderWidth / images.length;
   let activeSliderShift = activeSliderWidth * activePic;

   return (
      <div className={cn(styles['wrapper'], className)} {...props}>
         <div className={styles['previews']} ref={previewsRef}>
            {images.map((img, index) => (
               <Image
                  src={img}
                  alt={alt || 'Gallery'}
                  width={width}
                  height={600}
                  className={cn(styles['image'], {
                     [styles['active']]: index === activePreview
                  })}
                  key={index}
                  id={`${index}`}
                  onClick={handleImgClick}
               />
            ))}
         </div>
         {!pic && (
            <div className={styles.loading}>
               <p>Loading</p>{' '}
            </div>
         )}
         {pic && (
            <div
               className={styles['current-image-wrapper']}
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}
            >
               <Image
                  src={pic}
                  alt={alt || 'Gallery'}
                  className={styles['current-image']}
                  width={540}
                  height={540}
                  priority
               />

               <div className={styles['slider-wrapper']} ref={sliderWrapperRef}>
                  <div className={cn(styles['slider'])}></div>
                  <div
                     className={styles['active-slide']}
                     style={{
                        width: `${activeSliderWidth}px`,
                        transform: `translateX(${activeSliderShift}px)`
                     }}
                  />
               </div>
            </div>
         )}
      </div>
   );
}
