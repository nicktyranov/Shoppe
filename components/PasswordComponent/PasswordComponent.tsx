'use client';
import { IPasswordComponentProps } from './PasswordComponent.props';
import Image from 'next/image';
import icon1 from './eye-open-icon.svg';
import icon2 from './eye-close-icon.svg';
import cn from 'classnames';
import styles from './PasswordComponent.module.css';
import { useState } from 'react';
import Input from '../Input/Input';

export default function PasswordComponent({
   className,
   placeholder,
   value,
   onChange,
   ...props
}: IPasswordComponentProps) {
   const [icon, setIcon] = useState(icon1);
   const [passwordType, setPasswordType] = useState(true);

   const handleIconClick = () => {
      setIcon(icon === icon1 ? icon2 : icon1);
      setPasswordType(!passwordType);
   };

   return (
      <div className={cn(styles['input-wrapper'], className)}>
         <label htmlFor="password" />
         <Input
            className={styles.input}
            type={passwordType ? 'password' : 'text'}
            placeholder={placeholder}
            value={value}
            name="password"
            onChange={onChange}
            {...props}
         />
         <div className={styles['icon-wrapper']}>
            <Image
               src={icon}
               alt="show/hide password"
               className={cn(styles.icon)}
               width={27}
               height={13}
               onClick={handleIconClick}
            />
         </div>
      </div>
   );
}
