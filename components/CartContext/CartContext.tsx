'use client';

import React, {
   createContext,
   useContext,
   useState,
   ReactNode,
   useEffect
} from 'react';

interface CartItem {
   sku: string;
   amount: number;
}

interface CartContextType {
   cart: CartItem[];
   updateCart: (newCart: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
   const [cart, setCart] = useState<CartItem[]>([]);

   useEffect(() => {
      const storedCart = JSON.parse(
         localStorage.getItem('shoppe_cart') || '[]'
      );
      setCart(storedCart);
   }, []);

   const updateCart = (newCart: CartItem[]) => {
      setCart(newCart);
      localStorage.setItem('shoppe_cart', JSON.stringify(newCart));
   };

   return (
      <CartContext.Provider value={{ cart, updateCart }}>
         {children}
      </CartContext.Provider>
   );
};

export const useCart = () => {
   const context = useContext(CartContext);
   if (!context) {
      throw new Error('useCart must be used within a CartProvider');
   }
   return context;
};
