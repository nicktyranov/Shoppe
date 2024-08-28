'use client';
import { IButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';

export default function Button({ text, className, ...props }: IButtonProps) {
   return (
      <button className={cn(styles['button'], className)} {...props}>
         {text}
      </button>
   );
}
