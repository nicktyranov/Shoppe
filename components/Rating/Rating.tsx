'use client';
import { IRatingProps } from './Rating.props';
import cn from 'classnames';
import Image from 'next/image';
import iconStar from './star.svg';
import iconStarEmpty from './icon-star-empty.svg';
import { useState } from 'react';
import styles from './Rating.module.css';

export default function Rating({
   reviews,
   isEditable = false,
   reviewsSummary = false,
   className,
   value,
   shareRating,
   ...props
}: IRatingProps) {
   const [rating, setRating] = useState<number>(
      value
         ? value
         : reviews && reviews.length > 0
         ? reviews.reduce((sum, x) => (sum += x.rating), 0) / reviews.length
         : 0
   );

   const handleClick = (num: number) => {
      if (isEditable) {
         setRating(num);
         if (shareRating) {
            shareRating(num);
         }
      }
   };

   const renderStars = () => {
      let arr = [];
      for (let i = 0; i < 5; i++) {
         arr.push(
            <div
               key={i}
               onClick={() => handleClick(i + 1)}
               className={styles['rating-element']}
            >
               <Image
                  src={i < rating ? iconStar : iconStarEmpty}
                  alt={`star ${i + 1}`}
               />
            </div>
         );
      }
      return arr;
   };

   return (
      <div className={cn(styles['rating-block'], className)} {...props}>
         <div className={styles.rating}>{renderStars()}</div>
         {reviewsSummary && (
            <p className={styles['text']}>
               {reviews && reviews.length + ' reviews'}
            </p>
         )}
      </div>
   );
}
