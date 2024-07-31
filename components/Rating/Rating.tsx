// 'use client';
// import { IRatingProps } from './Rating.props';
// import cn from 'classnames';
// import styles from './Rating.module.css';
// import Image from 'next/image';
// import iconStar from './star.svg';
// import iconStarEmpty from './icon-star-empty.svg';
// import { useEffect, useState } from 'react';

// export default function Rating({
//    reviews,
//    isEditable = false,
//    reviewsSummary = false,
//    className,
//    ...props
// }: IRatingProps) {
//    const [rating, setRating] = useState<number>();

//    useEffect(() => {
//       console.log(`set up rating - ${rating}`);
//    }, [rating]);

//    const makeRating = (num: number) => {
//       let arr = [];
//       for (let i = 0; i < 5; i++) {
//          if (i < num) {
//             arr.push(<Image src={iconStar} alt={`star ${i + 1}`} key={i} />);
//          } else {
//             arr.push(
//                <Image src={iconStarEmpty} alt={`star ${i + 1}`} key={i} />
//             );
//          }
//       }
//       return arr;
//    };

//    const recieveRating = () => {
//       let arr = [];
//       for (let i = 0; i < 5; i++) {
//          arr.push(
//             <div key={i} onClick={() => setRating(i + 1)}>
//                <Image
//                   src={iconStarEmpty}
//                   alt={`star ${i + 1}`}
//                   key={i}
//                   id={`${i + 1}`}
//                />
//             </div>
//          );
//       }
//       return arr;
//    };

//    return (
//       <div className={styles['rating-block']}>
//          <div className={styles.rating}>
//             {!isEditable &&
//                makeRating(
//                   reviews.reduce((sum, x) => (sum += x.rating), 0) /
//                      reviews.length
//                )}
//             {isEditable && recieveRating()}
//             {rating !== undefined && makeRating(rating)}
//          </div>
//          {reviewsSummary && (
//             <p className={styles['description-text']}>
//                {reviews.length + ' reviews'}
//             </p>
//          )}
//       </div>
//    );
// }

'use client';
import { IRatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';
import Image from 'next/image';
import iconStar from './star.svg';
import iconStarEmpty from './icon-star-empty.svg';
import { useEffect, useState } from 'react';

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
