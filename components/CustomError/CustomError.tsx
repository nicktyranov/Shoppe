'use client';
import cn from 'classnames';
import Button from '../Button/Button';
import { ICustomErrorProps } from './CustomError.props';
import styles from './CustomError.module.css';

export default function CustomError({ text }: ICustomErrorProps) {
   return (
      <div className={cn(styles['wrapper'])}>
         <h2>Error has occured</h2>
         <p>{text}</p>

         <Button
            text="Click to try again"
            className={styles.button}
            onClick={() => window.location.reload()}
         />
      </div>
   );
}
