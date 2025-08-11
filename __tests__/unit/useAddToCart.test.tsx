import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useAddToCart } from '@/components/Cart/CartFunction';

const useCartMock = jest.fn();
const updateCartMock = jest.fn();

jest.mock('@/components/CartContext/CartContext', () => ({
   __esModule: true,
   useCart: () => useCartMock()
}));

// component to test the addToCart functionality
function Harness({
   payload
}: {
   payload: {
      productSKU: string;
      quantity: number;
      price: number;
      name: string;
   };
}) {
   const addToCart = useAddToCart();
   return <button data-testid="go" onClick={() => addToCart(payload)} />;
}

afterEach(() => {
   jest.clearAllMocks();
});

test('adds new item to empty cart', async () => {
   useCartMock.mockReturnValue({ cart: [], updateCart: updateCartMock });

   const user = userEvent.setup();
   render(
      <Harness
         payload={{ productSKU: '1', quantity: 2, price: 100, name: 'N' }}
      />
   );

   await user.click(screen.getByTestId('go'));

   expect(updateCartMock).toHaveBeenCalledTimes(1);
   expect(updateCartMock).toHaveBeenCalledWith([
      { sku: '1', name: 'N', amount: 2, price: 100 }
   ]);
});

test('updates existing item in cart', async () => {
   useCartMock.mockReturnValue({
      cart: [{ sku: '1', name: 'Old', amount: 1, price: 10 }],
      updateCart: updateCartMock
   });

   const user = userEvent.setup();
   render(
      <Harness
         payload={{ productSKU: '1', quantity: 3, price: 20, name: 'New' }}
      />
   );

   await user.click(screen.getByTestId('go'));

   expect(updateCartMock).toHaveBeenCalledTimes(1);
   expect(updateCartMock).toHaveBeenCalledWith([
      { sku: '1', name: 'New', amount: 3, price: 20 }
   ]);
});
