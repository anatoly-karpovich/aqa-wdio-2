describe('Waiters in wdio', () => {
  const dropdownLinkSelector = '[href="/dropdown"]';

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    const url = 'https://the-internet.herokuapp.com/';
    await browser.url(url);
    const dropdownLink = await $(dropdownLinkSelector);
    await dropdownLink.waitForExist({
      timeoutMsg: 'Dropdown is not exists in DOM! Make good selectors, noob!',
      timeout: 5000,
      interval: 1000,
      reverse: false
    });

    await dropdownLink.waitForDisplayed({
      timeoutMsg: 'Dropdown is not displayed! Make good selectors, noob!',
      timeout: 5000,
      interval: 1000,
      reverse: false
    });
  });

  it.skip('Click on dropdown link', async () => {
    await $(dropdownLinkSelector).click();
  });

  it.skip('Dynamic constrolls', async () => {
    const linkSelector = '[href="/dynamic_controls"]';
    await $(linkSelector).click();

    const removeButton = await $('//div[@id="checkbox"]/following-sibling::button');
    await removeButton.waitForDisplayed();
    const checkbox = await $('div#checkbox input');
    await checkbox.click();

    await removeButton.click();

    const enableButton = await $('form#input-example button');

    await enableButton.waitForDisplayed({
      timeoutMsg: 'Element is still displayed after 5000 seconds',
      reverse: true,
      timeout: 5000
    });

    // waitForEnabled():
    // waitForClickable()
    // waitForStable()
  });

  it.skip('Custom waits', async () => {
    const linkSelector = '[href="/dynamic_controls"]';
    await $(linkSelector).click();

    const removeButton = await $('//div[@id="checkbox"]/following-sibling::button');
    await removeButton.waitForDisplayed();

    const enableButton = await $('form#input-example button');

    await enableButton.click();

    await browser.waitUntil(
      async () => {
        const isEnabled = await enableButton.isEnabled();
        const isClickable = await enableButton.isClickable();

        return isEnabled && isClickable;
      },
      {
        timeout: 10000,
        interval: 1000,
        timeoutMsg: 'Element still not enabled and clickable'
      }
    );
  });

  it.skip('Elements array', async () => {
    const aArray = await $$('ul li a');
    // for (const li of liArray) {
    //   const text = await li.getText();
    //   console.log(text);
    // }

    // let dropdownElement: WebdriverIO.Element | undefined = undefined;

    // for (const a of liArray) {
    //   const text = await a.getText();
    //   if (text === 'Dropdown') {
    //     await a.click();
    //     break;
    //   }
    // }

    // await browser.pause(3000);

    // aArray.forEach(async (el) => {
    //   const text = await el.getText();
    //   console.log(text);
    // });

    //   const names = await aArray.map(async (el) => {
    //     return el.getText();
    //   });
    //   const resolvedNames = await Promise.all(names);
    //   console.log(resolvedNames);

    const linkSelector = '[href="/dynamic_controls"]';
    await $(linkSelector).click();

    await browser.waitUntil(
      async () => {
        const isDisplayed = await aArray.every(async (el) => !(await el.isDisplayed()));
        return isDisplayed;
      },
      {
        timeoutMsg: 'One of elements is still displayed'
      }
    );
    await (await $(linkSelector)).click();
  });

  const creds = [
    {
      checkName: 'invalid username',
      username: 'tomsmith1',
      password: 'SuperSecretPassword!',
      expectedNotification: 'Your username is invalid!'
    },
    {
      checkName: 'invalid password',
      username: 'tomsmith',
      password: 'SuperSecretPassword!2',
      expectedNotification: 'Your password is invalid!'
    }
  ];

  for (const invalidCredentials of creds) {
    it.skip(`Should not log in with ${invalidCredentials.checkName}`, async () => {
      const linkSelectorCSS = 'a[href="/login"]';

      await $(linkSelectorCSS).click();

      const form = await $('form#login');
      await form.waitForDisplayed();

      await form.$('#username').setValue(invalidCredentials.username);
      await form.$('[name="password"]').setValue(invalidCredentials.password);
      await form.$('button.radius').click();

      const errorNotificationText = await $('div.flash.error').getText();
      expect(errorNotificationText.includes(invalidCredentials.expectedNotification)).toBeTruthy();
    });
  }

  it('table', async () => {
    await $('[href="/tables"]').click();

    const tableSelector = '#table1';
    await $(tableSelector).waitForDisplayed();

    const trs = await $$('#table1 tbody tr');
    let row: WebdriverIO.Element | undefined = undefined;

    for (const tr of trs) {
      for (const td of await tr.$$('td')) {
        const text = await td.getText();
        if (text === '$100.00') {
          row = tr;
        }
      }
    }
    if (row) {
      const fields = await row.$$('td');
      for (const field of fields) {
        const text = await field.getText();
        console.log(text);
      }
    }
  });

  it.only('Parse table', async () => {
    await $('[href="/tables"]').click();

    const tableSelector = '#table1';
    await $(tableSelector).waitForDisplayed();

    const headers = await Promise.all(await $$('#table1 th.header span').map((h) => h.getText()));
    const rowsValues = [];
    for (const tr of await $$('#table1 tbody tr')) {
      const rowValues = [];
      for (const td of await tr.$$('td')) {
        const text = await td.getText();
        rowValues.push(text);
      }
      rowsValues.push(rowValues);
    }

    const rows = rowsValues.map((row) =>
      row.reduce(
        (res, r, i) => {
          res[headers[i]] = r;
          return res;
        },
        {} as Record<string, string>
      )
    );
    console.log(rows);
  });
});

// async function isEnabledAndClickable(element: WebdriverIO.Element, callback: () => boolean, options: object) {
//   return await browser.waitUntil(
//     async () => {
//       const isEnabled = await element.isEnabled();
//       const isClickable = await element.isClickable();

//       return isEnabled && isClickable;
//     },
//     {
//       timeout: 10000,
//       interval: 1000,
//       timeoutMsg: 'Element still not enabled and clickable'
//     }
//   );
// }
