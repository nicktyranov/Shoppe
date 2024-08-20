'use client';
import { IOrderFormProps } from './LoginForm.props';
import cn from 'classnames';
import styles from './LoginForm.module.css';
import Input from '../Input/Input';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import PasswordComponent from '../PasswordComponent/PasswordComponent';
import { useAuth } from '../AuthContext/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function LoginForm({}: IOrderFormProps) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [checkbox, setCheckbox] = useState(false);
   const [errorEmail, setErrorEmail] = useState('');
   const [errorSubmit, setErrorSubmit] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [validForm, setValidForm] = useState(true);
   const router = useRouter();

   const [clickedTab, setClickedTab] = useState(1);

   const { register, login, isLogined } = useAuth();

   useEffect(() => {
      if (isLogined) {
         router.push('/user/orders');
      } else if (errorSubmit) {
         setIsLoading(false);
      } else {
         setIsLoading(false);
      }
   }, [isLogined, router, errorSubmit]);

   useEffect(() => {
      if (email.length < 1) {
         return;
      }
      if (checkEmail(email)) {
         setErrorEmail('');
      } else {
         setErrorEmail('Invalid email format. Check email and try again');
      }
   }, [email]);

   useEffect(() => {
      if (email.length < 1) {
         return;
      }
      if (checkEmail(email)) {
         setErrorEmail('');
      } else {
         setErrorEmail('Invalid email format. Check email and try again');
      }
   }, [email]);

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
   };

   function checkEmail(email: string) {
      const regex =
         /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
      return regex.test(email);
   }

   const handleTabClick = (
      tabNumber: number,
      event: React.MouseEvent<HTMLButtonElement>
   ) => {
      event.preventDefault();
      setClickedTab(tabNumber);
   };

   const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         let loginData;
         if (clickedTab == 1) {
            loginData = await login({
               email,
               password,
               saveData: checkbox
            });
         } else {
            loginData = await register(email, password);
         }

         if (loginData.access_token) {
            setErrorEmail('');
            setErrorSubmit('');
            setValidForm(true);

            //for middleware
            Cookies.set('shoppe_jwt', loginData.access_token, { expires: 7 });
            router.push('/user/orders');
         }
         if (loginData.message) {
            setErrorSubmit(loginData.message);
         } else {
            setErrorSubmit('');
         }
      } catch (error) {
         setIsLoading(false);
         console.error('Login failed with error:', error);
         setErrorSubmit('An unexpected error occurred');
      }
   };

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className={cn(styles['wrapper'])}>
         <form className={styles['form']}>
            <h2 className={styles['heading']}>My account</h2>

            <div className={styles['btn-toggle']}>
               <button
                  type="button"
                  className={cn({
                     [styles['btn-toggle-active']]: clickedTab === 1
                  })}
                  onClick={(e) => handleTabClick(1, e)}
               >
                  Login
               </button>
               <button
                  type="button"
                  className={cn({
                     [styles['btn-toggle-active']]: clickedTab === 2
                  })}
                  onClick={(e) => handleTabClick(2, e)}
               >
                  Register
               </button>
            </div>
            <div className={styles['form-elements']}>
               <div>
                  <label htmlFor="email" />
                  {errorEmail && <div className={'error'}>{errorEmail}</div>}
                  <Input
                     placeholder={'Email'}
                     value={email}
                     onChange={(e) => handleEmailChange(e)}
                  />
               </div>

               <PasswordComponent
                  placeholder={'Type your password'}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
               />
               {clickedTab == 2 && (
                  <PasswordComponent
                     placeholder={'Repeat your password'}
                     value={password}
                     onChange={(e) => setPassword(e.currentTarget.value)}
                  />
               )}

               {clickedTab == 1 && (
                  <CheckBox
                     text={'Remember me'}
                     onClick={() => setCheckbox(!checkbox)}
                  />
               )}
               <div>
                  {errorSubmit && (
                     <div className={'error'}>{`${errorSubmit}`}</div>
                  )}
                  <Button
                     text={'Login'}
                     className={styles['form-button']}
                     onClick={handleLogin}
                  />
               </div>
            </div>
            <Link href={'/user/recovery'}>
               <p className={styles['form-recovery']}>Forgot your password?</p>
            </Link>
         </form>
      </div>
   );
}
