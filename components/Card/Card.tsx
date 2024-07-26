import { ICardProps } from './Card.props';
import Image from 'next/image';
import iconLike from './like-icon-colored.svg';
import cn from 'classnames';
import testImg from './Img 01.png';
import styles from './Card.module.css';
import Link from 'next/link';

export default function Card({
   discount,
   isLiked,
   soldOut,
   heading,
   price,
   img,
   sku,
   main,
   className,
   ...props
}: ICardProps) {
   let width, height;
   if (main) {
      width = 380;
      height = 380;
   } else {
      width = 300;
      height = 300;
   }

   return (
      <div
         className={cn(styles['card-wrapper'], {
            [styles['card-wrapper-main']]: main
         })}
         {...props}
      >
         <Link href={`/shop/${sku}`}>
            <div className={cn(styles['poster-wrapper'], className)}>
               <Image
                  src={img || testImg}
                  alt="search icon"
                  className={cn(styles.poster)}
                  width={width}
                  height={height}
                  priority
               />
            </div>

            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.price}>${price}.00</p>

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
         </Link>
      </div>
   );
}
