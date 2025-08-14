'use client';
import cn from 'classnames';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { showNotification } from '../Notification/Notification';
import { checkEmail } from '@/helpers/emailHelper';
import styles from './PasswordRecovery.module.css';

export default function PasswordRecovery() {
   const [email, setEmail] = useState('');
   const [errorEmail, setErrorEmail] = useState('');
   const [errorSubmit, setErrorSubmit] = useState(false);
   const [validForm, setValidForm] = useState(true);
   const { restorePassword } = useAuth();

   useEffect(() => {
      if (errorEmail) {
         setValidForm(false);
      } else {
         setValidForm(true);
      }
   }, [errorEmail]);

   useEffect(() => {
      if (email.length < 1) {
         setErrorEmail('');
         return;
      }
      if (checkEmail(email)) {
         setErrorEmail('');
      } else {
         setErrorEmail('Invalid email. Try again');
      }
   }, [email]);

   const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!validForm) {
         showNotification(`Error: ${errorEmail}`, false);
         return;
      }

      try {
         const response = await restorePassword(email);
         if (response) {
            showNotification(response, true);
         }
         return response;
      } catch (error) {
         setErrorSubmit(true);
      }
   };

   return (
      <div className={cn(styles['wrapper'])}>
         <form className={styles['form']}>
            <div>
               <h2 className={styles['heading']}>Forgot your password?</h2>
               <p className={styles['subheading']}>
                  If you forgot your password, enter your email and we will send
                  you a link to restore it.
               </p>
            </div>
            <div>
               <label htmlFor="email" />
               {errorEmail && <div className={'error'}>{errorEmail}</div>}
               <Input
                  placeholder={'Your email'}
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
               />
               <Button
                  text="Reset password"
                  className={cn(styles.button, {
                     [styles['button-disabled']]: !validForm
                  })}
                  onClick={(e) => handleButtonClick(e)}
               />
               {errorSubmit && (
                  <div className="error">
                     There is an error with your request. Please try again
                     later.
                  </div>
               )}
            </div>
         </form>
      </div>
   );
}
