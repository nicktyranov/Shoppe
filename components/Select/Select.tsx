'use client';
import { ISelectProps } from './Select.props';
import Image from 'next/image';
import iconArrow from './Icon arrow.svg';
import cn from 'classnames';
import styles from './Select.module.css';
import { useState } from 'react';

export default function Select({ className, ...props }: ISelectProps) {
   const [selected, setSelected] = useState('');
   console.log(selected);
   return (
      <div className={cn(styles['select-wrapper'], className)} {...props}>
         <label>
            <select
               onChange={(e) => setSelected(e.target.value)}
               className={styles.select}
               value={selected}
            >
               <option value="" disabled>
                  Choose a category
               </option>
               <option value="apple">Apple</option>
               <option value="banana">Banana</option>
            </select>
         </label>
         {/* <Image
            src={iconArrow}
            alt="search icon"
            className={cn(styles.icon)}
            height={19}
            width={25}
         /> */}
      </div>
   );
}
