'use client';
import { ISliderRangeProps } from './SliderRange.props';
import Image from 'next/image';
import icon from './icon-on-off.svg';
import cn from 'classnames';
import styles from './SliderRange.module.css';
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SliderRange({
   className,
   min,
   max,
   ...props
}: ISliderRangeProps) {
   const [range, setRange] = useState([min, max]);

   const handleChange = (value: number | number[]) => {
      if (Array.isArray(value)) {
         setRange(value);
      }
   };

   return (
      <div className={cn(styles['slider-wrapper'], className)} {...props}>
         <div className={styles.slider}>
            <Slider
               range
               min={min}
               max={max}
               value={range}
               onChange={handleChange}
               dots={false}
               step={5}
               styles={{
                  rail: { backgroundColor: '#D8D8D8', height: '2px' },
                  track: { backgroundColor: '#000', height: '2px' },
                  handle: { borderColor: 'gray', height: '12px', width: '12px' }
               }}
            />
         </div>

         <div className={styles['slider-info']}>
            Price range: ${range[0]} - ${range[1]}
         </div>
      </div>
   );
}
