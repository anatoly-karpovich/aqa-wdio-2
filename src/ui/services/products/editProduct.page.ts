import { EditProductPage } from '../../pages/products/editProduct.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';

export class EditProductService {
  constructor(
    private productsPage = new ProductsPage(),
    private editProductPage = new EditProductPage()
  ) {}
}
