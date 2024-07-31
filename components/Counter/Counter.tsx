'use client';
import { ICounterProps } from './Counter.props';
import cn from 'classnames';
import styles from './Counter.module.css';
import { useState } from 'react';

export default function Counter({ className, ...props }: ICounterProps) {
   const [value, setValue] = useState(1);

   const handleChangeIncrease = () => {
      setValue(value + 1);
   };

   const handleChangeDecrease = () => {
      if (value > 1) {
         setValue(value - 1);
      }
   };
   return (
      <div className={cn(styles['wrapper'], className)} {...props}>
         <button className={styles['button']} onClick={handleChangeDecrease}>
            -
         </button>
         <span className={styles['number']}>{value}</span>
         <button className={styles['button']} onClick={handleChangeIncrease}>
            +
         </button>
      </div>
   );
}
