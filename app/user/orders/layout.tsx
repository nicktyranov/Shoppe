import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Shop App | My orders',
   description: 'User orders in the Shoppe'
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <div>{children}</div>;
}
