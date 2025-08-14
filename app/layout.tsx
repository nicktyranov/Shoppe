import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Menu from '@/components/Menu/Menu';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import ToasterProvider from '@/components/ToasterProvider/ToasterProvider';
import { Suspense } from 'react';
import { CartProvider } from '@/components/CartContext/CartContext';
import { FavoritesContextProvider } from '@/components/FavoritesContext/FavoritesContext';
import { OrdersProvider } from '@/components/OrdersContext/OrdersContext';
import { AuthProvider } from '@/components/AuthContext/AuthContext';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Shoppe',
   description:
      'Shoppe is an online jewelry store offering elegant necklaces, rings, bracelets, and more with a smooth and secure shopping experience.'
};

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={font.className}>
            <Suspense fallback={<div>Loading...</div>}>
               <AuthProvider>
                  <FavoritesContextProvider>
                     <CartProvider>
                        <OrdersProvider>
                           <header>
                              <Menu />
                           </header>

                           <div>{children}</div>
                           <Footer />
                           <ToasterProvider />
                        </OrdersProvider>
                     </CartProvider>
                  </FavoritesContextProvider>
               </AuthProvider>
            </Suspense>
         </body>
      </html>
   );
}
