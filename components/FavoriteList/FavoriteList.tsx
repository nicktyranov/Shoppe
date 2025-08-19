'use client';
import { IFavoriteListProps } from './FavoriteList.props';
import { useFavorites } from '../FavoritesContext/FavoritesContext';
import { useEffect, useState } from 'react';
import { IProductBySKU } from '@/interfaces/interface.bySku';
import Card from '../Card/Card';
import CustomError from '../CustomError/CustomError';

export default function FavoriteList({
   className,
   ...props
}: IFavoriteListProps) {
   const { favoriteList } = useFavorites();
   const [data, setData] = useState(favoriteList);
   const [serverData, setServerData] = useState<IProductBySKU[]>();

   useEffect(() => {
      setData(favoriteList);
   }, [favoriteList]);

   useEffect(() => {
      const fetchAll = async () => {
         try {
            const fetchData = async (url: string): Promise<IProductBySKU> => {
               const response = await fetch(url);
               return response.json();
            };

            const makeRequests = () => {
               const requests = [];
               for (let i = 0; i < data.length; i++) {
                  requests.push(
                     process.env.NEXT_PUBLIC_DOMAIN +
                        '/api-demo/products/sku/' +
                        data[i]
                  );
               }
               return requests;
            };
            const requests = makeRequests();

            const res: IProductBySKU[] = await Promise.all(
               requests.map(fetchData)
            );

            if (!res) {
               return (
                  <CustomError text={'There is an error. Refresh the page'} />
               );
            }
            setServerData(res);
         } catch (e) {
            console.error(e);
         }
      };
      fetchAll();
   }, [data]);

   return (
      <div className={className} {...props}>
         {serverData &&
            serverData.map((item) => {
               return (
                  <Card
                     heading={item.name}
                     price={item.price}
                     img={item.images[0]}
                     key={item.sku}
                     sku={item.sku}
                  />
               );
            })}
      </div>
   );
}
