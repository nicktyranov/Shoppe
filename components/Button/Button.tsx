'use client';
import { IButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';
import { useState } from 'react';

export default function Button({ text, className, ...props }: IButtonProps) {
   const [value, setValue] = useState(1);

   return (
      <button className={cn(styles['button'], className)} {...props}>
         {text}
      </button>
   );
}
