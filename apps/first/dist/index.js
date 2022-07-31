var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var _a;
import { Hono } from "hono";
import { html } from "hono/html";
import { cors } from "hono/cors";
const app = new Hono();
app.use("*", cors());
app.get("/", (c) => __async(void 0, null, function* () {
  const indexCss = yield (yield c.env.MY_BUCKET.get("index.css")).text();
  if (!indexCss)
    return c.notFound();
  return c.html(html(_a || (_a = __template([`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>My Homepage</title><link rel="shortcut icon" href="data:image/svg+xml,<><path d='M10 8.99a1 1 0 00-.695 1.717l4.004 4a1 1 0 101.414-1.414l-4.004-4A1 1 0 0010 8.99z' fill='%2380b0ff' stroke='%235D7FDDaa' stroke-width='.3'/><path d='M6.508 1C3.48 1 1.002 3.474 1.002 6.5S3.48 12 6.508 12s5.504-2.474 5.504-5.5S9.536 1 6.508 1zm0 2a3.486 3.486 0 013.504 3.5c0 1.944-1.556 3.5-3.504 3.5a3.488 3.488 0 01-3.506-3.5C3.002 4.556 4.56 3 6.508 3z' fill='%2380b0ff' stroke='%235D7FDDaa' stroke-width='.3'/></svg>" /><style>`, `</style><script defer src="https://unpkg.com/alpinejs@3.10.3/dist/cdn.min.js" ><\/script></head><body class="cyan p-2"><nav x-data="{data: '...loading'}" x-init="data = await (await fetch('https://hello123.tk/services/nav')).text(); " ><span x-html="data"></span></nav><main x-data="{data: '...loading'}" x-init="data = await (await fetch('https://content.tt5.workers.dev')).text(); " ><span x-html="data"></span></main></body></html>`])), indexCss));
}));
export default app;
