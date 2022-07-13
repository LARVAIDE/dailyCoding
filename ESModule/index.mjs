import { foo, bar } from "./modules.mjs";

console.log(foo, bar)


import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = fileURLToPath(import.meta.url);
console.log(__dirname)
const __filename = dirname(__dirname)
console.log(__filename)