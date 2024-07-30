import { SalesPortalPage } from '../salesPortal.page.js';

export class ProductsPage extends SalesPortalPage {
  uniqueElement = '//h2[.="Products List "]';

  private readonly 'Add New Product button' = 'button.page-title-header';
  private readonly 'Table row selector' = (product: string) => `//tr[./td[text()="${product}"]]`;
  private readonly 'Name by table row' = (product: string) => `${this['Table row selector'](product)}/td[1]`;
  private readonly 'Price by table row' = (product: string) => `${this['Table row selector'](product)}/td[2]`;
  private readonly 'Manufacturer by table row' = (product: string) => `${this['Table row selector'](product)}/td[3]`;

  async clickOnAddNewProduct() {
    await this.click(this['Add New Product button']);
  }

  async getDataByName(name: string) {
    const [price, manufacturer] = await Promise.all([
      this.getText(this['Price by table row'](name)),
      this.getText(this['Manufacturer by table row'](name))
    ]);
    return { name, price: +price.replace('$', ''), manufacturer };
  }
}
