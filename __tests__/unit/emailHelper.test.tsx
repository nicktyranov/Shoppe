import '@testing-library/jest-dom';
import { checkEmail } from '@/helpers/emailHelper';

test('checkEmail returns true for valid email', () => {
   const validEmail = '1@gmail.com';
   expect(checkEmail(validEmail)).toBe(true);
});
test('checkEmail returns false for invalid email', () => {
   expect(checkEmail('12...3@gmail.com')).toBe(false);
   expect(checkEmail('12@@gmail.com')).toBe(false);
   expect(checkEmail('test@.com')).toBe(false);
});
test('checkEmail returns false for email without domain', () => {
   const noDomainEmail = 'test@.com';
   expect(checkEmail(noDomainEmail)).toBe(false);
});
