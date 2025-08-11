import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckBox from '@/components/CheckBox/CheckBox';

test('renders CheckBox without crashing', () => {
   const element = <CheckBox text="Click" />;
   const { getByText } = render(element);
   expect(getByText('Click')).toBeInTheDocument();
});

test('renders CheckBox with checked state', async () => {
   render(<CheckBox text="Click" checked onChange={() => {}} />);
   const checkbox = await screen.findByTestId('checkbox-input');
   expect(checkbox).toBeChecked();
});
