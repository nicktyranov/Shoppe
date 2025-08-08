import { ICheckBoxProps } from './CheckBox.props';
import cn from 'classnames';
import styles from './CheckBox.module.css';
import { useId } from 'react';

export default function CheckBox({
   text,
   className,
   checked,
   onChange,
   ...props
}: ICheckBoxProps) {
   const id = useId();
   return (
      <div className={cn(styles['wrapper'], className)}>
         <input
            id={id}
            className={styles.checkbox}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            data-testid="checkbox-input"
            {...props}
         />
         <label htmlFor={id}>{text}</label>
      </div>
   );
}
