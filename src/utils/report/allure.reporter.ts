import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';
import { IRequestOptions, IResponse } from '../../data/types/api.types.js';

export class AllureReporter {
  private requestOptions: IRequestOptions | null;
  private response: IResponse | null;

  constructor() {
    this.requestOptions = null;
    this.response = null;
  }

  public reportApiRequest(requestOptions: IRequestOptions, response: IResponse): void {
    this.requestOptions = requestOptions;
    this.response = response;
    this.logRequest();
    this.logResponse();
  }

  private logRequest(): void {
    allure.startStep(`Request: ${this.requestOptions?.method?.toUpperCase()} ${this.requestOptions?.url}`);
    allure.addAttachment('Request Headers', JSON.stringify(this.requestOptions?.headers, null, 2), 'application/json');
    allure.addAttachment(
      'Request Body',
      this.requestOptions?.data ? JSON.stringify(this.requestOptions?.data, null, 2) : {},
      'application/json'
    );
    allure.endStep();
  }

  private logResponse() {
    allure.startStep(`Response: ${this.response?.status} ${this.requestOptions?.url}`);
    allure.addAttachment('Response Headers', JSON.stringify(this.response?.headers, null, 2), 'application/json');
    allure.addAttachment('Response Body', JSON.stringify(this.response?.body, null, 2), 'application/json');
    allure.endStep(this.response && this.response.status >= 400 ? Status.FAILED : Status.PASSED);
  }
}
