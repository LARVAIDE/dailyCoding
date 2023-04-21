import { Page } from "puppeteer-core";

const signup = async (page: Page) => {
  const { pathname, origin } = new URL(page.url());
 
  if (pathname !== "/signup") {
    await page.goto(`${origin}/signup`);
  }
  await page.waitForSelector("#email");

  const $username = await page.$("#email"); 
  await $username?.type("rs2gj4ea@yzm.de", {
    delay: 100,
  });

  const $password = await page.$("#password");
  await $password?.type("11111111", {
    delay: 100,
  });

  const $button = await page.$('button[type="submit"]');
  await $button?.click();
  await page.waitForNavigation();
};

export default signup;
