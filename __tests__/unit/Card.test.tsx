import { getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '@/components/Card/Card';
import { CartProvider } from '@/components/CartContext/CartContext';
import { FavoritesContextProvider } from '@/components/FavoritesContext/FavoritesContext';

const testData = {
   heading: 'test',
   price: 100,
   sku: 1
};

test('renders Card without crashing', () => {
   jest.spyOn(window.localStorage, 'getItem').mockReturnValueOnce('[]');

   const { getByText } = render(
      <FavoritesContextProvider>
         <CartProvider>
            <Card {...testData} />
         </CartProvider>
      </FavoritesContextProvider>
   );

   let element = getByText(testData.heading);
   expect(element).toBeInTheDocument();
   element = getByText(/\$\s*100\.00/);
   expect(element).toBeInTheDocument();
});

afterEach(() => {
   jest.restoreAllMocks();
});
