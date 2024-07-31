'use client';
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

   const checkEmail = () => {
      function validateEmail(email: string) {
         const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
         return re.test(email);
      }

      if (email && validateEmail(email)) {
         showNotification('You have been successfully subscribed', true);
      } else {
         showNotification('Invalid email address', false);
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
               onClick={checkEmail}
               value={email}
               onChange={inputHandleChange}
               placeholder={'Enter your email for promotions'}
               icon
            />
         </div>

         <div className={styles['contact-info']}>
            <p>&#169; {new Date().getFullYear()} Shoppe </p>
            <Image
               src={iconLinkedIn}
               alt="search icon"
               className={cn('styles.icon')}
               height={18}
               width={18}
            />
         </div>
      </div>
   );
}
