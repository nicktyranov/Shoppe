'use client';
import { checkEmail } from '@/helpers/emailHelper';
import { IFooterProps } from './Footer.props';
import Image from 'next/image';
import iconLinkedIn from './Icon linkedin.svg';
import cn from 'classnames';
import Link from 'next/link';
import Input from '../Input/Input';
import { showNotification } from '../Notification/Notification';
import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer({ ...props }: IFooterProps) {
   const [email, setEmail] = useState('');

   const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   const handleEmailSubmit = () => {
      if (email && checkEmail(email)) {
         showNotification('You have been successfully subscribed', true);
         setEmail('');
      } else {
         showNotification('Invalid email address', false);
      }
   };

   const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleEmailSubmit();
      } else {
         return;
      }
   };

   return (
      <div className={cn(styles.footer)} {...props}>
         <div className={styles['menu-input-wrapper']}>
            <div className={styles.menu}>
               <Link href="/contacts">CONTACTS</Link>
               <Link href="/terms">TERMS & CONDITIONS</Link>
               <Link href="/delivery">DELIVERY</Link>
            </div>
            <Input
               className={styles.input}
               onClick={handleEmailSubmit}
               value={email}
               onChange={inputHandleChange}
               placeholder={'Enter your email for promotions'}
               icon
               onKeyDown={(e) => keyDownHandler(e)}
            />
         </div>

         <div className={styles['contact-info']}>
            <p>&#169; {new Date().getFullYear()} Shoppe </p>
            <Link href="https://www.linkedin.com/in/ntyranov/" target="_blank">
               <Image
                  src={iconLinkedIn}
                  alt="search icon"
                  className={cn('styles.icon')}
                  height={18}
                  width={18}
               />
            </Link>
         </div>
      </div>
   );
}
