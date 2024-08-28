'use client';

import React, {
   createContext,
   useContext,
   useState,
   ReactNode,
   useEffect
} from 'react';
import { CartItem } from '../CartContext/CartContext';

export interface OrderData {
   id: number;
   userId: number;
   status: string;
   createdAt: string;
   username: string;
   email: string | undefined;
   address: string;
   mobileNumber: string;
   data: CartItem[];
}

interface OrdersContextType {
   orders: OrderData[];
   addOrder: (order: OrderData) => void;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
   const [orders, setOrders] = useState<OrderData[]>([]);

   useEffect(() => {
      const storedOrders = JSON.parse(
         localStorage.getItem('shoppe_orders') || '[]'
      );
      setOrders(storedOrders);
   }, []);

   const addOrder = (order: OrderData) => {
      const currentOrders = [...orders];
      currentOrders.push(order);
      setOrders(currentOrders);
      localStorage.setItem('shoppe_orders', JSON.stringify(currentOrders));
   };

   return (
      <OrdersContext.Provider value={{ orders, addOrder }}>
         {children}
      </OrdersContext.Provider>
   );
};

export const useOrders = () => {
   const context = useContext(OrdersContext);
   if (!context) {
      throw new Error('useCart must be used within a OrdersContext.Provider');
   }
   return context;
};
