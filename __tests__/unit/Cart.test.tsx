import { getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/Cart/Cart';
import { CartProvider } from '@/components/CartContext/CartContext';
import { FavoritesContextProvider } from '@/components/FavoritesContext/FavoritesContext';

const mockCart = [{ sku: '123', name: 'Item 1', amount: 2 }];

test('renders Cart without crashing', () => {
   jest
      .spyOn(window.localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(mockCart));

   const { getByText } = render(
      <FavoritesContextProvider>
         <CartProvider>
            <Cart />
         </CartProvider>
      </FavoritesContextProvider>
   );

   expect(getByText('1')).toBeInTheDocument();
   expect(getByText('1')).toHaveClass('cart');
});
