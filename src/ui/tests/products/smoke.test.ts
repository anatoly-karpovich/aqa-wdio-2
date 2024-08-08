import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { HomeService } from '../../services/home.service.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductsListService } from '../../services/products/products.service.js';
import { EditProductService } from '../../services/products/editProduct.page.js';
import { SignInService } from '../../services/signIn.service.js';
import allure from '@wdio/allure-reporter';
import { ProductsApiClient } from '../../../api/clients/products.client.js';

describe('[UI] [Products] Smoke', () => {
  allure.addFeature('Products Creation Feature');
  allure.addSuite('[Products] Smoke');
  const signInService = new SignInService();
  const homeService = new HomeService();
  const addProductService = new AddProductService();
  const productsService = new ProductsListService();
  const editProductService = new EditProductService();
  const productClient = new ProductsApiClient();

  beforeEach(async () => {
    await signInService.openSalesPortal();
    await signInService.loginAsAdmin();
  });

  afterEach(async () => {
    await signInService.signOut();
  });

  it('Should craete valid product', async () => {
    allure.addStory('Users creates product with valid data via ui');
    allure.addSeverity('blocker');
    await homeService.openProductsPage();
    await productsService.openAddNewProductPage();
    const product = generateNewProduct();
    await addProductService.create(product);
    await productsService.checkProductInTable(product);
  });

  it('Should update valid product', async () => {
    allure.addStory('Users updates product via ui');
    allure.addSeverity('blocker');
    const token = (await browser.getCookies('Authorization'))[0]?.value;
    const product = await productClient.create(generateNewProduct(), `Bearer ${token}`);
    await homeService.openProductsPage();
    await productsService.openEditProductPage(product.body.Product.name);
  });
});
