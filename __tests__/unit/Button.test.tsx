import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/components/Button/Button';

test('renders Button without crashing', () => {
   const button = <Button text="Click" />;
   const { getByText } = render(button);
   expect(getByText('Click')).toBeInTheDocument();
});
