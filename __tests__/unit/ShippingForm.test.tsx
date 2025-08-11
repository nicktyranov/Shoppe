import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ShippingForm from '@/components/ShippingForm/ShippingForm';

jest.mock('@/components/Input/Input', () => (props: any) => (
   <input {...props} />
));
jest.mock('@/components/Button/Button', () => (props: any) => (
   <button
      disabled={props.disabled}
      className={props.className}
      onClick={props.onClick}
   >
      {props.text}
   </button>
));

// context mocks to control their state in tests
import { useCart } from '@/components/CartContext/CartContext';
import { useAuth } from '@/components/AuthContext/AuthContext';
import { useOrders } from '@/components/OrdersContext/OrdersContext';

jest.mock('@/components/CartContext/CartContext', () => ({
   __esModule: true,
   useCart: jest.fn()
}));
jest.mock('@/components/AuthContext/AuthContext', () => ({
   __esModule: true,
   useAuth: jest.fn()
}));
jest.mock('@/components/OrdersContext/OrdersContext', () => ({
   __esModule: true,
   useOrders: jest.fn()
}));

beforeAll(() => {
   process.env.NEXT_PUBLIC_DOMAIN = 'https://purpleschool.ru';
});

beforeEach(() => {
   // Default mocked state for each test
   (useCart as jest.Mock).mockReturnValue({
      cart: [],
      totalCost: 0
   });

   (useAuth as jest.Mock).mockReturnValue({
      isLogined: false,
      auth: undefined,
      register: jest.fn(),
      login: jest.fn(),
      getProfile: jest.fn(),
      updateProfile: jest.fn()
   });

   (useOrders as jest.Mock).mockReturnValue({
      addOrder: jest.fn()
   });
});

afterEach(() => {
   jest.clearAllMocks();
});

// 1) If cart is empty → SEND button should be disabled and total = $0
test('disables SEND when cart is empty and shows $0', () => {
   render(<ShippingForm setIsOrderSuccess={jest.fn()} />);

   const sendBtn = screen.getByRole('button', { name: /send/i });
   expect(sendBtn).toBeDisabled();

   expect(screen.getByText('$0')).toBeInTheDocument();
});

// 2) If user is logged in + all inputs are valid → SEND button should be enabled
test('enables SEND when logged-in user fills valid name/address/mobile and cart has items', async () => {
   const user = userEvent.setup();

   // cart with items and total cost > 0
   (useCart as jest.Mock).mockReturnValue({
      cart: [{ sku: '1', name: 'Prod', amount: 1, price: 100 }],
      totalCost: 100
   });

   // user is logged in
   (useAuth as jest.Mock).mockReturnValue({
      isLogined: true,
      auth: { jwt: 'jwt' },
      register: jest.fn(),
      login: jest.fn(),
      getProfile: jest.fn(),
      updateProfile: jest.fn()
   });

   render(<ShippingForm setIsOrderSuccess={jest.fn()} />);

   // UserEvent will type into the input fields
   await user.type(
      screen.getByPlaceholderText('Your address*'),
      'Main street 10'
   );
   await user.type(screen.getByPlaceholderText('Your name*'), 'John');
   await user.type(
      screen.getByPlaceholderText('Your mobile number*'),
      '1234567890'
   );

   const sendBtn = screen.getByRole('button', { name: /send/i });
   expect(sendBtn).not.toBeDisabled();
});

// 3) If email is invalid and user is not logged in → show email error message
test('shows email error on invalid email when not logged-in', async () => {
   const user = userEvent.setup();

   //isLogined = false + email and password fields are visible
   (useAuth as jest.Mock).mockReturnValue({
      isLogined: false,
      auth: undefined,
      register: jest.fn(),
      login: jest.fn(),
      getProfile: jest.fn(),
      updateProfile: jest.fn()
   });

   render(<ShippingForm setIsOrderSuccess={jest.fn()} />);

   await user.type(screen.getByPlaceholderText('Your email*'), 'bad-email');
   //Error message that component displays when the email is invalid
   expect(
      await screen.findByText(/Invalid email\. Try again/i)
   ).toBeInTheDocument();
});
