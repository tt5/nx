import { Hono } from "hono";
import { html } from "hono/html";
import { cors } from "hono/cors";
const app = new Hono();
app.use("*", cors());
app.get("/", (c) => {
  return c.html(html`<h1 x-data="{ message: 'nav11' }" x-text="message" ></h1>`);
});
export default app;
