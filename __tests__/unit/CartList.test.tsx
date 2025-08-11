import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartList from '@/components/CartList/CartList';

jest.mock('@/components/CartContext/CartContext', () => ({
   useCart: () => ({ cart: [{ sku: '1', amount: 1 }] })
}));

jest.mock('@/components/OrderForm/OrderForm', () => () => (
   <div>Order Form</div>
));

beforeAll(() => {
   process.env.NEXT_PUBLIC_DOMAIN = 'https://purpleschool.ru';
});

test('CartList: renders product from server - success', async () => {
   global.fetch = jest.fn(() =>
      Promise.resolve({
         json: () => Promise.resolve({ sku: '1', name: 'Test product' })
      })
   ) as jest.Mock;

   render(<CartList />);

   expect(await screen.findByText('Order Form')).toBeInTheDocument();
});

test('CartList: shows error when fetch fails', async () => {
   global.fetch = jest.fn(() => Promise.reject(new Error('fail'))) as jest.Mock;

   render(<CartList />);

   expect(
      await screen.findByText(/Failed to load products/i)
   ).toBeInTheDocument();
});
