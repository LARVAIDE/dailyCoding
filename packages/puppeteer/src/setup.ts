import { exec } from "child_process";
import ps from "ps-node";

const initBrowser = async () => {
  ps.lookup({ command: "Google Chrome Canary" }, (err, resultList) => {
    if (err) {
      console.error(err);
      return;
    }
    if (resultList.length === 0) {
      launchBrowser();
      console.log("Chrome Canary is running!");
      return "Chrome Canary is running!";
    }
    console.log("Chrome Canary is not running.");
  });
};

const launchBrowser = () => {
  exec(
    "",
    (err, stdout, stderr) => {
      if (err) {
        console.error(`执行命令时出错： ${err}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
};

export default initBrowser;
