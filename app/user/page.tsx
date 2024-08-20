import cn from 'classnames';
import styles from './page.module.css';
import LoginForm from '@/components/LoginForm/LoginForm';

export default function User() {
   return (
      <div className={styles['pagination-list']}>
         <LoginForm />
      </div>
   );
}
