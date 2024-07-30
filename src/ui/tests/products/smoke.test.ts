import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct, MANUFACTURERS } from '../../../data/types/product.types.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductsListService } from '../../services/products/products.service.js';

describe('[UI] [Products] Smoke', () => {
  const addProductService = new AddProductService();
  const productsService = new ProductsListService();

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');
    await $('#emailinput').setValue('aqacourse@gmail.com');
    await $('input[type="password"]').setValue('password');
    await $('.btn-primary').click();
    await $('.spinner-border').waitForDisplayed({ reverse: true });
    await $('(//a[contains(@class, "nav-link")])[3]').click();
    await $('.spinner-border').waitForDisplayed({ reverse: true });
  });

  it('Should craete valid product v1', async () => {
    await $('.btn-primary.page-title-button').click();
    await $('.spinner-border').waitForDisplayed({ reverse: true });

    enum MANUFACTURERS {
      APPLE = 'Apple',
      SAMSUNG = 'Samsung',
      GOOGLE = 'Google',
      MICROSOFT = 'Microsoft',
      SONY = 'Sony',
      XIAOMI = 'Xiaomi',
      AMAZON = 'Amazon',
      TESLA = 'Tesla'
    }

    interface IProduct {
      name: string;
      manufacturer: MANUFACTURERS;
      price: number;
      amount: number;
      notes?: string;
    }

    const productToCreate: IProduct = {
      name: 'Test' + Date.now(),
      price: 100,
      amount: 2,
      notes: 'Test notes',
      manufacturer: MANUFACTURERS.XIAOMI
    };

    await $('#inputName').setValue(productToCreate.name);
    await $('select#inputManufacturer').selectByVisibleText(productToCreate.manufacturer);
    await $('#inputPrice').setValue(productToCreate.price);
    await $('#inputAmount').setValue(productToCreate.amount);
    if (productToCreate.notes) {
      await $('#textareaNotes').setValue(productToCreate.notes);
    }

    await $('#save-new-product').click();
    await $('.spinner-border').waitForDisplayed({ reverse: true });

    await browser.pause(5000);
  });

  it('Should craete valid product v2', async () => {
    const addNewProductPage = new AddNewProductPage();

    await $('.btn-primary.page-title-button').click();
    await addNewProductPage.waitForSpinnerToHide();

    const productToCreate: IProduct = {
      name: 'Test' + Date.now(),
      price: 100,
      amount: 2,
      notes: 'Test notes',
      manufacturer: MANUFACTURERS.XIAOMI
    };

    await addNewProductPage.fillInputs(productToCreate);
    await addNewProductPage.clickOnSaveButton();

    await addNewProductPage.waitForSpinnerToHide();

    await browser.pause(5000);

    //SignInService.openSalesPortal()
    //SignInService.login()
    //HomeService.openProductsPage()
    //ProductsService.openAddNewProductPage
    //AddNewProductService.create()
    //assertions
  });

  it.only('Should craete valid product v3', async () => {
    await productsService.openAddNewProductPage();
    const product = generateNewProduct();
    await addProductService.create(product);
    const actualProduct = await productsService.getCreatedProductData(product.name);
    const expectedProduct = { name: product.name, manufacturer: product.manufacturer, price: product.price };
    expect(actualProduct).toMatchObject(expectedProduct);
  });
});
