import { Hono } from 'hono';
import { html } from 'hono/html';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

app.get('/', (c) => {
  //c.header('Cache-Control', 'private, max-age=60')
  return c.html(
    html`<h1
      x-data="{ message: 'nav2' }"
      x-text="message"
    ></h1>`
  );
});

export default app;
