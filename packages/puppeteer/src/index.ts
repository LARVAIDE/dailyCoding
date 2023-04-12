import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 0,
      height: 0,
    },
  });

  const page = await browser.newPage();
  await page.goto('https://app.notta.ai/login');

  await page.waitForSelector('#email');

  const $username = await page.$('#email');
  await $username?.type('n50@langogo.test', {
    delay: 100,
  });

  const $password = await page.$('#password');
  await $password?.type('', {
    delay: 100,
  });

  const $button = await page.$('button[type="submit"]');
  await $button?.click();
  await page.waitForNavigation();
})();
