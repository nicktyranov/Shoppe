import { ICheckBoxProps } from './CheckBox.props';
import cn from 'classnames';
import styles from './CheckBox.module.css';

export default function CheckBox({
   text,
   className,
   checked,
   onChange,
   ...props
}: ICheckBoxProps) {
   return (
      <div className={cn(styles['wrapper'], className)}>
         <input
            className={styles.checkbox}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            {...props}
         />
         <p>{text}</p>
      </div>
   );
}
