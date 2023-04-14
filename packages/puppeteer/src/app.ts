import puppeteer from "puppeteer-core";

import login from "./scripts/login";
import upload from "./scripts/upload";

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
    pages.find((p) => p.url() === "https://test-app-12154205867b06a3.notta.ai/login") || pages[0];
  await page.goto("https://test-app-12154205867b06a3.notta.ai/login");

  await login(page); 

  await upload(page);
})();
