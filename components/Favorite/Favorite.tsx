'use client';
import { IFavoriteProps } from './Favorite.props';
import cn from 'classnames';
import icon from './like-icon.svg';
import icon2 from './like-icon-colored.svg';
import styles from './Favorite.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function Favorite({
   Liked,
   className,
   ...props
}: IFavoriteProps) {
   const [isLiked, setIsLiked] = useState(Liked || false);

   const handleClick = () => {
      setIsLiked(!isLiked);
   };

   return (
      <button
         className={cn(styles['button'], className)}
         {...props}
         onClick={handleClick}
      >
         <Image
            src={isLiked ? icon2 : icon}
            alt="like icon"
            width={19}
            height={19}
         />
      </button>
   );
}
