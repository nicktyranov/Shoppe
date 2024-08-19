'use client';

import React, {
   createContext,
   useContext,
   useState,
   ReactNode,
   useEffect,
   useCallback,
   useMemo
} from 'react';

export interface CartItem {
   sku: string;
   name: string;
   amount: number;
   price: number;
}

interface CartContextType {
   cart: CartItem[];
   updateCart: (newCart: CartItem[]) => void;
   totalCost: number;
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

   const updateCart = useCallback((newCart: CartItem[]) => {
      setCart(newCart);
      localStorage.setItem('shoppe_cart', JSON.stringify(newCart));
   }, []);

   const totalCost = useMemo(
      () => cart.reduce((sum, x) => sum + x.price * x.amount, 0),
      [cart]
   );

   return (
      <CartContext.Provider value={{ cart, updateCart, totalCost }}>
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
