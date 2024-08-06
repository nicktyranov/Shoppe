'use client';
import { ITabContentProps } from './TabContent.props';
import cn from 'classnames';
import styles from './TabContent.module.css';
import { useState } from 'react';
import { IReview } from '@/interfaces/interface.bySku';
import Form from '../Form/Form';
import Rating from '../Rating/Rating';

const reviewsEN = [
   'Overall, excellent, since they are not expensive and I didn’t have to give my wife a new phone that she asked for.',
   'I would have put more, but upon delivery these earrings were wrinkled and became triangular, not round. Otherwise the service is excellent and I will continue to buy from this store.'
];

export default function TabContent({
   description,
   reviews,
   sku,
   className
}: ITabContentProps) {
   const [activeTab, setActiveTab] = useState('description');

   return (
      <div className={cn(styles['wrapper'], className)}>
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
            <div className={styles['reviews-with-form']}>
               <div className={styles['reviews-wrapper']}>
                  {reviews.map((review: IReview, index: number) => (
                     <div className={styles['review']} key={index}>
                        <div className={styles['review-info']}>
                           <div>
                              {review?.name === 'Василий' ? 'Alex' : 'Steve'}
                           </div>
                           <div>{review?.date.slice(0, 10)}</div>
                        </div>
                        <Rating value={review?.rating} />

                        <p>
                           {review?.description ===
                           'В целом отлично, так как стоят не дорого и не пришлось жене дарить новый телефон, который она просила.'
                              ? reviewsEN[0]
                              : reviewsEN[1]}
                        </p>
                     </div>
                  ))}
               </div>
               <Form sku={sku} className={styles.form} />
            </div>
         )}
      </div>
   );
}
