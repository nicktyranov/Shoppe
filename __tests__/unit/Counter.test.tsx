import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Counter from '@/components/Counter/Counter';
import { useState } from 'react';

test('renders Counter without crashing', () => {
   const element = <Counter amount={2} onChange={() => {}} />;
   const { getByText } = render(element);
   expect(getByText('2')).toBeInTheDocument();
   expect(getByText('+')).toBeInTheDocument();
   expect(getByText('-')).toBeInTheDocument();
});

// Wrapper component to manage state for controlled Counter
function Wrapper({ initialAmount }: { initialAmount: number }) {
   const [value, setValue] = useState(initialAmount);
   return <Counter amount={value} onChange={setValue} />;
}

test('renders Counter: button tests (controlled)', async () => {
   const user = userEvent.setup();
   render(<Wrapper initialAmount={5} />);

   await user.click(screen.getByText('+'));
   expect(screen.getByText('6')).toBeInTheDocument();

   await user.click(screen.getByText('-'));
   expect(screen.getByText('5')).toBeInTheDocument();

   await user.click(screen.getByText('-'));
   expect(screen.getByText('4')).toBeInTheDocument();
});
