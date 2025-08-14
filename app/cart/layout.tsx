import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Shop App | Cart',
   description: 'Your cart in the Shoppe App'
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <div>{children}</div>;
}
