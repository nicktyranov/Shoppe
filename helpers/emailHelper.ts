export function checkEmail(email: string): boolean {
   const regex =
      /^[0-9A-Za-z][-0-9A-Za-z.]*[0-9A-Za-z]@([-A-Za-z]+\.){1,2}[-A-Za-z]{2,}$/;
   return regex.test(email);
}
