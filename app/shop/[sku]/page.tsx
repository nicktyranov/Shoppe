import iconStar from './star.svg';
import iconStarEmpty from './icon-star-empty.svg';
import iconMail from './icon-mail.svg';
import Image from 'next/image';
import Counter from '@/components/Counter/Counter';
import Button from '@/components/Button/Button';
import Favorite from '@/components/Favorite/Favorite';
import TabContent from '@/components/TabContent/TabContent';
import { IProductBySKU } from '@/interfaces/interface.bySku';
import { Metadata } from 'next';
import Gallery from '@/components/Gallery/Gallery';
import cn from 'classnames';
import styles from './page.module.css';

const dataDescription =
   'Universal classic. The earrings are made of rose gold with a path of diamonds and emeralds. Delicate, sophisticated, they will suit not only a business suit, but will also complement the image of any fashionista.';

export async function generateMetadata({
   params
}: {
   params: { [key: string]: number };
}): Promise<Metadata> {
   const id = params.sku;
   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api-demo/products/sku/' + id
   );
   const data = await res.json();

   return {
      title: `Buy ${data.name} in the Shoppe`,
      description: `${data.name} - ${data.description}`
   };
}

async function getData(id: number): Promise<IProductBySKU> {
   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api-demo/products/sku/' + id
   );
   return await res.json();
}

export default async function Product({
   params
}: {
   params: { [key: string]: number };
}) {
   const { sku } = params;
   const data = await getData(sku);

   const makeRating = (num: number) => {
      let arr = [];
      for (let i = 0; i < 5; i++) {
         if (i < num) {
            arr.push(
               <Image src={iconStar} alt={`star ${i + 1}`} key={i + 1} />
            );
         } else {
            arr.push(
               <Image src={iconStarEmpty} alt={`star ${i + 1}`} key={i + 1} />
            );
         }
      }
      return arr;
   };

   const translateCategory = (id: number) => {
      switch (id) {
         case 1:
            return 'Hairpins';
         case 2:
            return 'Earrings';
         case 3:
            return 'Pendants';
         default:
            return 'Unknown';
      }
   };

   return (
      <div className={styles['wrapper']}>
         <div className={styles['description']}>
            {/* <div className={styles['gallery']}> */}
            <Gallery
               images={data.images}
               alt={`images of ${data.name}`}
               width={540}
               className={styles['gallery']}
            />
            {/* </div> */}
            <div className={styles['short-data']}>
               <h2 className={styles['heading']}>{data.name}</h2>
               <p className={styles['price']}>${data.price}</p>
               <div className={styles['rating-block']}>
                  <div className={styles.rating}>
                     {makeRating(
                        data.reviews.reduce((sum, x) => (sum += x.rating), 0) /
                           data.reviews.length
                     )}
                  </div>
                  <p className={styles['description-text']}>
                     {data.reviews.length + ' reviews'}
                  </p>
               </div>
               <p
                  className={cn(
                     styles['description-text'],
                     styles['short-description']
                  )}
               >
                  {dataDescription}
               </p>
               <div className={styles['buttons']}>
                  <Counter className={styles['button']} />
                  <Button text="add to the cart" className={styles['button']} />
               </div>
               <div className={styles['icons']}>
                  <div>
                     <Favorite className={styles['icon']} />
                  </div>
                  <div>
                     <Image
                        src={iconMail}
                        alt="icon mail"
                        className={styles['icon']}
                     />
                  </div>
               </div>
               <div className={styles['info-labels']}>
                  <p className={styles['label']}>
                     SKU:<span>{data.sku}</span>
                  </p>
                  <p className={styles['label']}>
                     Category:<span>{translateCategory(data.categoryId)}</span>
                  </p>
               </div>
            </div>
         </div>
         <TabContent
            description={dataDescription}
            reviews={data.reviews}
            className={styles['tab-content']}
         />
      </div>
   );
}
