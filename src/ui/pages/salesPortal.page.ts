import { BasePage } from './base.page.js';

export class SalesPortalPage extends BasePage {
  protected readonly spinner = '.spinner-border';
  uniqueElement = '';

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 10000, true);
  }
}
