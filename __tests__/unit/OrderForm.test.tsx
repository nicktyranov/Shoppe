import { getByTestId, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderForm from '@/components/OrderForm/OrderForm';
import userEvent from '@testing-library/user-event';

const testCartItem = {
   sku: 1,
   name: 'testProduct',
   amount: 1,
   price: 10
};

const testProductData = {
   name: 'Test Product',
   price: 10,
   description: 'This is a test product',
   images: ['/components/OrderForm/iconCross.svg'],
   categoryId: 1,
   sku: 1,
   reviews: []
};

jest.mock('next/image', () => () => null);

const updateCartMock = jest.fn();
jest.mock('@/components/CartContext/CartContext', () => ({
   __esModule: true,
   useCart: () => ({
      cart: [testCartItem],
      updateCart: updateCartMock
   }),
   CartProvider: ({ children }: any) => <div>{children}</div>
}));

test('renders OrderForm with product data', () => {
   const { getByText } = render(
      <OrderForm data={testProductData} amount={1} />
   );
   expect(getByText(testProductData.name)).toBeInTheDocument();
   expect(getByText(`$${testProductData.price}`)).toBeInTheDocument();
});

test('renders OrderForm with userEvent - buttons click', async () => {
   render(<OrderForm data={testProductData} amount={1} />);
   const counter = screen.getByTestId('orderForm: counter');
   expect(counter).toBeInTheDocument();
   const increaseButton = getByText(counter, '+');
   const decreaseButton = getByText(counter, '-');

   await userEvent.click(increaseButton);
   await userEvent.click(increaseButton);
   expect(counter).toHaveTextContent('3');

   await userEvent.click(decreaseButton);
   expect(counter).toHaveTextContent('2');

   const btn = screen.getByTestId('button-delete');
   expect(btn).toHaveClass('delete-btn');

   await userEvent.click(btn);
   expect(updateCartMock).toHaveBeenCalledTimes(1);
});
