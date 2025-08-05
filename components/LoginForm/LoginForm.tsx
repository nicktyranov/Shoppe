'use client';
import cn from 'classnames';
import Input from '../Input/Input';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import PasswordComponent from '../PasswordComponent/PasswordComponent';
import { useAuth } from '../AuthContext/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { checkEmail } from '@/helpers/emailHelper';
import { useForm } from '@tanstack/react-form';
import styles from './LoginForm.module.css';

const serverErrorsEN = {
   'Неверный логин или пароль': 'Invalid email or password',
   'Пользователь с таким email уже существует':
      'User with this email already exists',
   'Пользователь с таким email не найден': 'User with this email not found'
};

export default function LoginForm() {
   const [errorSubmit, setErrorSubmit] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const [clickedTab, setClickedTab] = useState(1);
   const { register, login, isLogined } = useAuth();

   const form = useForm({
      defaultValues: {
         email: '',
         password: '',
         password2: '',
         checkbox: false
      },
      validators: {
         onSubmit: ({ value }) => {
            if (value.password !== value.password2) {
               return ['Passwords do not match'];
            }
            return [];
         }
      },
      onSubmit: async ({ value }) => {
         setIsLoading(true);

         try {
            let loginData;
            if (clickedTab == 1) {
               loginData = await login({
                  email: value.email,
                  password: value.password,
                  saveData: value.checkbox
               });
            } else {
               let email = value.email;
               let password = value.password;
               loginData = await register(email, password);
            }

            if (loginData.access_token) {
               setErrorSubmit('');

               //for middleware
               Cookies.set('shoppe_jwt', loginData.access_token, {
                  expires: 7
               });
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
      }
   });

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
      if (clickedTab) {
         setErrorSubmit('');
      }
   }, [clickedTab]);

   const handleTabClick = (
      tabNumber: number,
      event: React.MouseEvent<HTMLButtonElement>
   ) => {
      event.preventDefault();
      setClickedTab(tabNumber);
   };

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className={cn(styles['wrapper'])}>
         <form
            className={styles['form']}
            onSubmit={(e) => {
               e.preventDefault();
               e.stopPropagation();
               form.handleSubmit();
            }}
         >
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
               <form.Field
                  name="email"
                  validators={{
                     onChange: ({ value }) => {
                        if (value.length < 1) {
                           return 'Email is required';
                        }
                        if (checkEmail(value)) {
                           return '';
                        }
                        return 'Invalid email format. Check email and try again';
                     }
                  }}
               >
                  {(field) => (
                     <div>
                        <label htmlFor="email" />

                        {field.state.meta.errors.length !== 0 && (
                           <div className={'error'}>
                              {field.state.meta.errors}
                           </div>
                        )}
                        <Input
                           id={field.name}
                           name={field.name}
                           placeholder={'Email'}
                           value={field.state.value}
                           onChange={(e) =>
                              field.handleChange(e.currentTarget.value)
                           }
                        />
                     </div>
                  )}
               </form.Field>

               {clickedTab == 1 && (
                  <>
                     <form.Field
                        name="password"
                        validators={{
                           onChange: ({ value }) => {
                              if (value.length < 1) {
                                 return 'Password is required';
                              }
                           }
                        }}
                     >
                        {(field) => (
                           <div>
                              <label htmlFor="password" />
                              {field.state.meta.errors.length !== 0 && (
                                 <div className={'error'}>
                                    {field.state.meta.errors}
                                 </div>
                              )}
                              <PasswordComponent
                                 placeholder={'Type your password'}
                                 value={field.state.value}
                                 name={field.name}
                                 onChange={(e) =>
                                    field.handleChange(e.currentTarget.value)
                                 }
                              />
                           </div>
                        )}
                     </form.Field>

                     <form.Field name="checkbox">
                        {(field) => (
                           <div>
                              <label htmlFor="checkbox" />
                              <CheckBox
                                 text={'Remember me'}
                                 checked={field.state.value}
                                 onChange={(e) =>
                                    field.handleChange(e.currentTarget.checked)
                                 }
                              />
                           </div>
                        )}
                     </form.Field>
                  </>
               )}

               {clickedTab == 2 && (
                  <>
                     <form.Field
                        name="password"
                        validators={{
                           onChange: ({ value }) => {
                              if (value.length < 1) {
                                 return 'Password is required';
                              }
                           }
                        }}
                     >
                        {(field) => (
                           <div>
                              <label htmlFor="password" />
                              {field.state.meta.errors.length !== 0 && (
                                 <div className={'error'}>
                                    {field.state.meta.errors}
                                 </div>
                              )}
                              <PasswordComponent
                                 placeholder={'Type your password'}
                                 value={field.state.value}
                                 name={field.name}
                                 onChange={(e) =>
                                    field.handleChange(e.currentTarget.value)
                                 }
                              />
                           </div>
                        )}
                     </form.Field>

                     <form.Field
                        name="password2"
                        validators={{
                           onChange: ({ value, fieldApi }) => {
                              return value !==
                                 fieldApi.form.getFieldValue('password')
                                 ? 'Passwords do not match'
                                 : undefined;
                           }
                        }}
                     >
                        {(field) => (
                           <div>
                              <label htmlFor="password2" />
                              {field.state.meta.errors.length !== 0 && (
                                 <div className={'error'}>
                                    {field.state.meta.errors}
                                 </div>
                              )}
                              <PasswordComponent
                                 placeholder={'Retype your password'}
                                 value={field.state.value}
                                 name={field.name}
                                 onChange={(e) =>
                                    field.handleChange(e.currentTarget.value)
                                 }
                              />
                           </div>
                        )}
                     </form.Field>
                  </>
               )}

               <div>
                  {errorSubmit && (
                     <div className="error">
                        {serverErrorsEN[
                           errorSubmit as keyof typeof serverErrorsEN
                        ] ?? errorSubmit}
                     </div>
                  )}
                  {form.state.errors.length > 0 && (
                     <div className={'error'}>
                        {(() => {
                           const key = form.state.errors[0];
                           if (key && key in serverErrorsEN) {
                              return serverErrorsEN[
                                 key as keyof typeof serverErrorsEN
                              ];
                           }
                           return form.state.errors.join(', ');
                        })()}
                     </div>
                  )}
                  <form.Subscribe selector={(state) => state.errors}>
                     {(errors) => (
                        <>
                           {errors.length > 0 && (
                              <div className={'error'}>{errors.join(', ')}</div>
                           )}
                        </>
                     )}
                  </form.Subscribe>

                  <Button text={'Login'} className={styles['form-button']} />
               </div>
            </div>
            <Link href={'/user/recovery'}>
               <p className={styles['form-recovery']}>Forgot your password?</p>
            </Link>
         </form>
      </div>
   );
}
