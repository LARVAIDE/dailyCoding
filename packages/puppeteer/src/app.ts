import puppeteer from "puppeteer-core";
/**
 * see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
 */
import * as dotenv from 'dotenv';

import login from "./scripts/login";
import signup from "./scripts/signup";
import upload from "./scripts/upload";

dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.beta" });

(async () => {
  const browser = await puppeteer.connect({
    defaultViewport: {
      width: 0,
      height: 0,
    },
    browserURL: "http://localhost:3002",
  });

  const pages = await browser.pages();
  const page =
    pages.find(
      (p) => p.url() === process.env.SITE_URL
    ) || pages[0];
  await page.goto(process.env.SITE_URL as string);

  await signup(page);
  // await login(page);
  // await upload(page);
})();
