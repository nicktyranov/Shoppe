import { screen, getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/Cart/Cart';
import { CartProvider } from '@/components/CartContext/CartContext';
import { FavoritesContextProvider } from '@/components/FavoritesContext/FavoritesContext';
import Card from '@/components/Card/Card';
import userEvent from '@testing-library/user-event';

const testCartItem = {
   sku: 1,
   name: 'testProduct',
   amount: 1,
   price: 10
};

const testProductData = {
   heading: 'Test Product',
   price: 10,
   description: 'This is a test product',
   images: ['/components/OrderForm/iconCross.svg'],
   sku: 1,
   reviews: []
};

const updateCartMock = jest.fn();
const useAddToCartMock = jest.fn();
jest.mock('@/components/CartContext/CartContext', () => ({
   __esModule: true,
   useCart: () => ({
      cart: [testCartItem],
      updateCart: updateCartMock
   }),
   CartProvider: ({ children }: any) => <div>{children}</div>
}));

jest.mock('@/components/Cart/CartFunction', () => ({
   __esModule: true,
   useAddToCart: () => useAddToCartMock
}));

jest.mock('@/components/FavoritesContext/FavoritesContext', () => ({
   __esModule: true,
   FavoritesContextProvider: ({ children }: any) => <div>{children}</div>,
   useFavorites: () => ({
      favoriteList: [],
      updateFavorites: jest.fn()
   })
}));

test('renders Card without crashing', async () => {
   const { getByText } = render(
      <FavoritesContextProvider>
         <CartProvider>
            <Card {...testProductData} />
         </CartProvider>
      </FavoritesContextProvider>
   );
   expect(getByText('Test Product')).toBeInTheDocument();
});

test('renders Card and calls useAddToCartMock', async () => {
   const { getByText } = render(
      <FavoritesContextProvider>
         <CartProvider>
            <Card {...testProductData} />
         </CartProvider>
      </FavoritesContextProvider>
   );
   expect(getByText('Test Product')).toBeInTheDocument();

   const btn = screen.getByTestId('addToCart');
   expect(btn).toBeInTheDocument();
   await userEvent.click(btn);
   expect(useAddToCartMock).toHaveBeenCalledTimes(1);
});

test('Card calls addToCart with expected payload', async () => {
   const user = userEvent.setup();
   render(<Card heading="Test Product" price={10} sku={1} img={''} />);

   const btn = screen.getByTestId('addToCart');
   await user.click(btn);

   //first call was in the previous test
   expect(useAddToCartMock).toHaveBeenCalledTimes(2);
   expect(useAddToCartMock).toHaveBeenCalledWith({
      productSKU: '1',
      name: 'Test Product',
      quantity: 1,
      price: 10
   });
});
