import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '@/components/AuthContext/AuthContext';

beforeAll(() => {
   process.env.NEXT_PUBLIC_DOMAIN = 'https://purpleschool.ru';
});

beforeEach(() => {
   // mock fetch to return access_token
   (global.fetch as any) = jest.fn(() =>
      Promise.resolve({
         ok: true,
         json: () => Promise.resolve({ access_token: 'token-123' })
      } as any)
   );
   localStorage.clear();
});

afterEach(() => {
   jest.resetAllMocks();
});

function Probe() {
   const { isLogined, login, logout, auth } = useAuth();
   return (
      <div>
         <span data-testid="flag">{String(isLogined)}</span>
         <span data-testid="jwt">{auth?.jwt ?? ''}</span>
         <button
            data-testid="login"
            onClick={() => login({ email: 'user@gmail.com', password: 'pass' })}
         >
            login
         </button>
         <button data-testid="logout" onClick={logout}>
            logout
         </button>
      </div>
   );
}

test('login sets isLogined=true and exposes jwt', async () => {
   const user = userEvent.setup();
   render(
      <AuthProvider>
         <Probe />
      </AuthProvider>
   );

   await user.click(screen.getByTestId('login'));

   //check the right URL and request body
   expect(global.fetch).toHaveBeenCalledWith(
      'https://purpleschool.ru/api-demo/auth/login',
      expect.objectContaining({
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email: 'user@gmail.com', password: 'pass' })
      })
   );

   // check: isLogined = true  AND jwt is set
   expect(await screen.findByTestId('flag')).toHaveTextContent('true');
   expect(await screen.findByTestId('jwt')).toHaveTextContent('token-123');
});

test('logout sets isLogined=false', async () => {
   const user = userEvent.setup();
   render(
      <AuthProvider>
         <Probe />
      </AuthProvider>
   );

   await user.click(screen.getByTestId('login'));
   expect(await screen.findByTestId('flag')).toHaveTextContent('true');

   await user.click(screen.getByTestId('logout'));
   expect(await screen.findByTestId('flag')).toHaveTextContent('false');
});
