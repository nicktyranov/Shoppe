import Card from '@/components/Card/Card';
import { IProductList } from '@/interfaces/interface.products';
import Filter from '@/components/Filter/Filter';
import PaginationControls from '@/components/PaginationControls/PaginationControls';
import styles from './page.module.css';

async function getProducts(params: {
   [key: string]: string;
}): Promise<IProductList> {
   const limit = params.limit || '24';
   const offset = params.offset || '0';
   const discounted = params.discounted || 'false';
   const name = params.name || '';
   const priceMin = params.priceMin || '0';
   const priceMax = params.priceMax || '100';
   const categoryId = params.categoryId || '';

   const requestedDiscount =
      discounted !== 'false' ? `&discounted=${discounted}` : '';
   const requestedCategory = categoryId ? `&categoryId=${categoryId}` : '';

   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN +
         `/api-demo/products?limit=${limit}&offset=${offset}${requestedDiscount}&name=${name}&priceMin=${priceMin}&priceMax=${priceMax}${requestedCategory}`
   );
   if (!res.ok) {
      throw new Error('Failed to fetch products');
   }

   const data: IProductList = await res.json();
   if (!data || !data.products) {
      throw new Error('Invalid products data');
   }

   return data;
}

export default async function Shop({
   searchParams
}: {
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const normalizedParams: { [key: string]: string } = {};
   for (const key in searchParams) {
      const value = searchParams[key];
      normalizedParams[key] = Array.isArray(value) ? value[0] : value || '';
   }
   const products = await getProducts(normalizedParams);

   const page = searchParams['page'] ?? '1';
   const per_page = searchParams['per_page'] ?? '6';
   const startIdx = (Number(page) - 1) * Number(per_page);
   const endIdx = startIdx + Number(per_page);

   const pageData = products.products.slice(startIdx, endIdx);

   return (
      <div className={styles.wrapper}>
         <h1 className={styles.h1}>All products</h1>
         <div className={styles.body}>
            <Filter className={styles.filter} />
            <div className={styles['pagination-list']}>
               <div className={styles.products}>
                  {pageData.map((product, index) => (
                     <Card
                        key={`${product.sku}-${index}`}
                        price={product.price}
                        heading={product.name}
                        img={product.images[0]}
                        sku={product.sku}
                     />
                  ))}
               </div>
               <PaginationControls
                  hasNextPage={endIdx < products.products.length}
                  hasPrevPage={startIdx > 0}
                  totalPages={products.products.length}
                  per_page={Number(per_page)}
               />
               <div>Total products – {products.products.length}</div>
            </div>
         </div>
      </div>
   );
}
