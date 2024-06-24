'use client';
import { IMenuProps } from './Menu.props';
import styles from './Menu.module.css';
import Image from 'next/image';
import logo from './logo.svg';
import likeIcon from './like-icon.svg';
import userIcon from './user-icon.svg';
import mobileMenuIcon from './mobileMenu.svg';
import Search from '../Search/Search';
import Link from 'next/link';
import Cart from '../Cart/Cart';

export default function Menu({}: IMenuProps) {
   return (
      <div className={styles.wrapper}>
         <div className={styles.menu}>
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
               <Search isClicked={false} />
               <Link href={'/cart'} className={styles.cart}>
                  <Cart amount={10} />
               </Link>
               <Link href={'/favorites'} className={styles.about}>
                  <Image src={likeIcon} alt="favorites icon" />
               </Link>
               <Link href={'/user'} className={styles.user}>
                  <Image src={userIcon} alt="user icon" />
               </Link>
            </nav>
         </div>
         <div className={styles['mobile-menu']}>
            <div>
               <Image src={logo} alt="Logo" className={styles.logo} priority />
            </div>
            <Link href={'/cart'} className={styles.cart}>
               <Cart amount={10} />
            </Link>
            <Image
               src={mobileMenuIcon}
               alt="mobile menu icon"
               id="mobileMenuIcon"
            />
            <Search isClicked={true} className={styles['mobile-search']} />
         </div>
      </div>
   );
}
