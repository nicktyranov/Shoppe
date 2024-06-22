'use client';
import { IMenuProps } from './Menu.props';
import styles from './Menu.module.css';
import Image from 'next/image';
import logo from './logo.svg';
import cartIcon from './cart-icon.svg';
import likeIcon from './like-icon.svg';
import userIcon from './user-icon.svg';
import { MouseEvent, useState } from 'react';
import cn from 'classnames';
import Search from '../Search/Search';
import Link from 'next/link';

export default function Menu({}: IMenuProps) {
   return (
      <div className={styles.wrapper}>
         <div>
            <Image src={logo} alt="Logo" className={styles.logo} priority />
         </div>
         <nav className={styles.nav}>
            <Link href={'/shop'} className={styles.shop}>
               Shop
            </Link>
            <Link href={'/about'} className={styles.about}>
               About
            </Link>
            <Search isClicked={false} className={styles.about} />
            <Link href={'/cart'} className={styles.cart}>
               <Image src={cartIcon} alt="cart icon" />
            </Link>
            <Link href={'/favorites'} className={styles.about}>
               <Image src={likeIcon} alt="favorites icon" />
            </Link>
            <Link href={'/user'} className={styles.user}>
               <Image src={userIcon} alt="user icon" />
            </Link>
         </nav>
      </div>
   );
}
