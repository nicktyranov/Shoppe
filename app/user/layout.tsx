import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Shop App | User',
   description: 'User profile in the Shoppe'
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <div>{children}</div>;
}
