import path from "path";
import { Page } from "puppeteer-core";

const upload = async (page: Page) => {
  await page.waitForSelector(
    'button[data-gtm="dashboard_newrecord_importfile_btn"]'
  );
  // 点击导入文件按钮
  await page.click('button[data-gtm="dashboard_newrecord_importfile_btn"]');

  await page.waitForSelector(
    'div[data-gtm="dashboard_drag_import_files_uploader"]'
  );

  // 点击上传按钮
  await page.click('div[data-gtm="dashboard_drag_import_files_uploader"]');

  // 等待文件选择窗口打开
  await page.waitForSelector("input[type=file]");

  // 获取文件选择窗口的 DOM 元素
  const inputUploadHandle = await page.$("input[type=file]");

  // 选择要上传的文件
  const filePath = path.resolve(process.cwd(), "static/10分钟-日语.wav");
  await inputUploadHandle?.uploadFile(filePath);

  // 后台上传
  await page.waitForSelector(
    'button[data-gtm="dashboard_transcription_cancel_uploader_btn"]'
  );
  await page.click('button[data-gtm="dashboard_transcription_cancel_uploader_btn"]');
};

export default upload;
