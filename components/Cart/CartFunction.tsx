import { useCart } from '../CartContext/CartContext';

export function useAddToCart() {
   const { cart, updateCart } = useCart();

   function addToCart({
      productSKU,
      quantity,
      price,
      name
   }: {
      productSKU: string;
      quantity: number;
      price: number;
      name: string;
   }) {
      const currentCart = [...cart];
      const productIndex = currentCart.findIndex(
         (item) => item.sku === productSKU
      );
      const newEntry = { sku: productSKU, name, amount: quantity, price };

      if (productIndex !== -1) {
         currentCart[productIndex] = newEntry;
      } else {
         currentCart.push(newEntry);
      }

      updateCart(currentCart);
   }

   return addToCart;
}
