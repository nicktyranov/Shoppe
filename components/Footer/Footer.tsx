'use client';
import { IFooterProps } from './Footer.props';
import styles from './Footer.module.css';
import Image from 'next/image';
import iconLinkedIn from './Icon linkedin.svg';

import { MouseEvent, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Input from '../Input/Input';

export default function Footer({ ...props }: IFooterProps) {
   return (
      <div className={cn(styles.footer)} {...props}>
         <div className={styles['menu-input-wrapper']}>
            <div className={styles.menu}>
               <Link href="/contacts">CONTACTS</Link>
               <Link href="/terms">TERMS & CONDITIONS</Link>
               <Link href="/delivery">DELIVERY</Link>
            </div>
            <Input className={styles.input} />
         </div>

         <div className={styles['contact-info']}>
            <p>&#169; {new Date().getFullYear()} Shoppe</p>
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
