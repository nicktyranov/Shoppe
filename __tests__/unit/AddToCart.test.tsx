import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddToCart from '@/components/AddToCart/AddToCart';
import { useCart } from '@/components/CartContext/CartContext';
import { useAddToCart } from '@/components/Cart/CartFunction';

jest.mock('@/components/CartContext/CartContext', () => ({
   useCart: () => ({
      addItem: jest.fn(),
      removeItem: jest.fn(),
      cart: []
   })
}));

test('renders AddToCart without crashing', () => {
   const element = (
      <AddToCart productName="test1" productSKU="007" productPrice={99} />
   );
   const { getByText } = render(element);
   expect(getByText('Add to the cart')).toBeInTheDocument();
   expect(getByText('+')).toBeInTheDocument();
   expect(getByText('-')).toBeInTheDocument();
});

const addToCartMock = jest.fn();
jest.mock('@/components/Cart/CartFunction', () => ({
   useAddToCart: () => addToCartMock
}));

test('AddToCart adds products to the cart', async () => {
   render(<AddToCart productName="test1" productSKU="007" productPrice={99} />);
   const addButton = screen.getByTestId('add-to-cart-button');
   await userEvent.click(addButton);
   expect(addToCartMock).toHaveBeenCalledTimes(1);
   expect(addToCartMock).toHaveBeenCalledWith({
      productSKU: '007',
      quantity: 1,
      price: 99,
      name: 'test1'
   });
});
