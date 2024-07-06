'use client';
import { ISelectProps } from './OnOffButton.props';
import Image from 'next/image';
import icon from './icon-on-off.svg';
import cn from 'classnames';
import styles from './OnOffButton.module.css';
import { useState } from 'react';

export default function OnOffButton({ className, ...props }: ISelectProps) {
   const [selected, setSelected] = useState(false);

   const handleClick = () => {
      setSelected(!selected);
   };
   console.log(selected);
   return (
      <div className={cn(styles['button-wrapper'], className)} {...props}>
         With discounts
         <button
            name="button"
            className={cn(styles.button, {
               [styles['button-clicked']]: selected
            })}
            onClick={handleClick}
         >
            <Image
               src={icon}
               alt="search icon"
               className={cn(styles.icon)}
               height={20}
               width={33}
            />
         </button>
      </div>
   );
}
