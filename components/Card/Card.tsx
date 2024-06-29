import { ICardProps } from './Card.props';
import Image from 'next/image';
import iconLike from './like-icon-colored.svg';
import cn from 'classnames';
import styles from './Card.module.css';
import testImg from './Img 01.png';

export default function Card({
   discount,
   isLiked,
   soldOut,
   heading,
   price,
   img,
   ...props
}: ICardProps) {
   return (
      <div className={cn(styles['card-wrapper'])} {...props}>
         <Image
            src={testImg}
            alt="search icon"
            className={cn(styles.poster)}
            width={300}
         />
         <h2 className={styles.heading}>{heading}</h2>
         <p className={styles.price}>${price}</p>

         {!isLiked && (
            <Image
               src={iconLike}
               alt="Like icon"
               className={cn(styles['poster-icon-right'])}
               width={19}
               height={18}
            />
         )}

         {discount && !soldOut && (
            <p className={cn(styles['poster-icon-left'])}>{discount}</p>
         )}
      </div>
   );
}
