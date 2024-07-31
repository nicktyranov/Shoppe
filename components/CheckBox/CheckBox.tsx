import { ICheckBoxProps } from './CheckBox.props';
import cn from 'classnames';
import styles from './CheckBox.module.css';

export default function CheckBox({
   text,
   className,
   ...props
}: ICheckBoxProps) {
   return (
      <div className={cn(styles['wrapper'], className)} {...props}>
         <input className={styles.checkbox} type="checkbox" name="saveData" />
         <p>{text}</p>
      </div>
   );
}
