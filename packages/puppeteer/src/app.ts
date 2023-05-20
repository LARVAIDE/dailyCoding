import puppeteer, { Browser } from 'puppeteer-core';
/**
 * see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
 */
import * as dotenv from 'dotenv';

import login from './scripts/login';
import signup from './scripts/signup';
import upload from './scripts/upload';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const { BROWSER_BUGGERING_PORT, SITE_URL } = process.env;

/**
 * 获取浏览器实例
 * @returns browser {Promise<Browser>}
 */
const getBrowserInstance = async () => {
  let browser: Browser;
  try {
    browser = await puppeteer.connect({
      defaultViewport: {
        width: 0,
        height: 0,
      },
      browserURL: `http://localhost:${BROWSER_BUGGERING_PORT}`,
    });
  } catch (error) {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
      args: ['--incognito', `--remote-debugging-port=${BROWSER_BUGGERING_PORT}`],
      defaultViewport: {
        width: 0,
        height: 0,
      },
    });
  }
  return browser;
};

(async () => {
  const browser = await getBrowserInstance();
  const pages = await browser.pages();

  const page = pages.find((p) => p.url() === SITE_URL) || pages[0];
  await page.goto(SITE_URL as string);

  await signup(page);
  // await login(page);
  // await upload(page);
})();
