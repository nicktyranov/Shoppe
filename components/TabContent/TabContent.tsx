'use client';
import { ITabContentProps } from './TabContent.props';
import cn from 'classnames';
import Image from 'next/image';
import iconStar from './star.svg';
import iconStarEmpty from './icon-star-empty.svg';
import styles from './TabContent.module.css';
import { useState } from 'react';
import { IReview } from '@/interfaces/interface.bySku';

export const makeRating = (num: number) => {
   let arr = [];
   for (let i = 0; i < 5; i++) {
      if (i < num) {
         arr.push(<Image src={iconStar} alt={`star ${i + 1}`} key={i + 1} />);
      } else {
         arr.push(
            <Image src={iconStarEmpty} alt={`star ${i + 1}`} key={i + 1} />
         );
      }
   }
   return arr;
};

const reviewsEN = [
   'Overall, excellent, since they are not expensive and I didn’t have to give my wife a new phone that she asked for.',
   'I would have put more, but upon delivery these earrings were wrinkled and became triangular, not round. Otherwise the service is excellent and I will continue to buy from this store.'
];

export default function TabContent({ description, reviews }: ITabContentProps) {
   const [activeTab, setActiveTab] = useState('description');
   console.log(reviews);

   return (
      <div className={styles['body']}>
         <div className={styles['description-reviews-toggle']}>
            <span
               className={activeTab === 'description' ? styles['active'] : ''}
               onClick={() => setActiveTab('description')}
            >
               description
            </span>
            <span
               className={activeTab === 'reviews' ? styles['active'] : ''}
               onClick={() => setActiveTab('reviews')}
            >
               reviews ({reviews.length})
            </span>
         </div>
         {activeTab === 'description' && (
            <div className={styles['main-description']}>
               <p className={styles['description-text']}>{description}</p>
            </div>
         )}
         {activeTab === 'reviews' && (
            <div className={styles['reviews-wrapper']}>
               {reviews.map((review: IReview, index: number) => (
                  <div className={styles['review']} key={index}>
                     <div className={styles['review-info']}>
                        <div>
                           {review?.name === 'Василий' ? 'Alex' : 'Steve'}
                        </div>
                        <div>{review?.date.slice(0, 10)}</div>
                     </div>
                     <div className={styles.rating}>
                        {makeRating(review?.rating)}
                     </div>
                     <p>
                        {review?.description ===
                        'В целом отлично, так как стоят не дорого и не пришлось жене дарить новый телефон, который она просила.'
                           ? reviewsEN[0]
                           : reviewsEN[1]}
                     </p>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
