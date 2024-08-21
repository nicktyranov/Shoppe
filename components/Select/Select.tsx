'use client';
import { ISelectProps } from './Select.props';
import cn from 'classnames';
import { useState } from 'react';
import styles from './Select.module.css';

export default function Select({
   className,
   categories,
   onChange,
   ...props
}: ISelectProps) {
   const [selected, setSelected] = useState<string>('');

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected(e.target.value);
      if (onChange) {
         onChange(e.target.value);
      }
   };

   return (
      <div className={cn(styles['select-wrapper'], className)} {...props}>
         <label>
            <select
               onChange={handleChange}
               className={styles.select}
               value={selected}
            >
               <option value="" disabled>
                  Choose a category
               </option>
               {categories &&
                  categories.map((c) => {
                     return (
                        <option value={c.id} key={c.id}>
                           {c.name}
                        </option>
                     );
                  })}
            </select>
         </label>
      </div>
   );
}
