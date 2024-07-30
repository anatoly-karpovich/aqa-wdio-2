import { type IProduct, MANUFACTURERS } from '../types/product.types.js';

export function generateNewProduct() {
  const productToCreate: IProduct = {
    name: 'Test' + Date.now(),
    price: 100,
    amount: 2,
    notes: 'Test notes',
    manufacturer: MANUFACTURERS.XIAOMI
  };
  return productToCreate;
}
