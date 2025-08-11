import { getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderLayout from '@/components/OrderLayout/OrderLayout';

jest.mock('@/components/CartContext/CartContext', () => ({
   __esModule: true,
   useCart: () => ({ cart: [], updateCart: jest.fn() }),
   CartProvider: ({ children }: any) => <div>{children}</div>
}));

jest.mock('@/components/OrdersContext/OrdersContext', () => ({
   __esModule: true,
   useOrders: () => ({ orders: [] }),
   OrdersProvider: ({ children }: any) => <div>{children}</div>
}));

jest.mock('next/image', () => (props: any) => <img {...props} />);

test('renders OrderLayout with empty cart state', () => {
   const { getByText } = render(<OrderLayout />);
   expect(getByText(/Cart is empty/i)).toBeInTheDocument();
   expect(getByText(/shop/i)).toBeInTheDocument();
});

afterEach(() => {
   jest.restoreAllMocks();
});
