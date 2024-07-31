import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Shop App | Shop',
   description: 'All products of Shoppe'
};

export default function ShopLayout({
   children
}: {
   children: React.ReactNode;
}) {
   return <div>{children}</div>;
}
