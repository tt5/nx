// src/index.ts
import { Hono } from 'hono';
import { html } from 'hono/html';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

app.get('/home', (c) => {
  //c.header('Cache-Control', 'private, max-age=60')
  return c.html(
    html`<div id="content-home">content-home<div>`
  );
});

app.get('/chess', (c) => {
  return c.html(
    html`
<template x-teleport="#content">
<div id="content-chess">
chess-data
</div>
</template>
    `
  );
});

app.get('/math', (c) => {
  return c.html(
    html`
<template x-teleport="#content">
<div id="content-math">
math-data
</div>
</template>
    `
  );
});

app.get('/notes', (c) => {
  return c.html(
    html`
<template x-teleport="#content">
<div id="content-notes">
notes-data
</div>
</template>
    `
  );
});

export default app;
