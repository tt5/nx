import { Hono } from "hono";
import { html } from "hono/html";
import { cors } from "hono/cors";
const app = new Hono();
app.use("*", cors());
app.get("/", (c) => {
  return c.html(html`<div class="min-v-screen max-v-screen flex"><div> nav-left </div><div class="flex-grow"></div><div class="flex gap-2"><button :class="$store.contentCurrent=='chess' ? 'button bg-white' : 'button cyan'" x-data="{datab: '<span></span>', children: {}, present: false}" @click=" children = document.querySelector('#content').childNodes; children.forEach(li => { if (li.id == 'content-chess') {present = true}; }); if (!present) { datab = await (await fetch('https://hello123.tk/services/content/chess')).text(); }; $store.contentCurrent = 'chess'; " >Chess <span x-html="datab"></span></button><button :class="$store.contentCurrent=='math' ? 'button bg-white' : 'button cyan'" x-data="{datab: '<span></span>', children: {}, present: false}" @click=" children = document.querySelector('#content').childNodes; children.forEach(li => { if (li.id == 'content-math') {present = true}; }); if (!present) { datab = await (await fetch('https://hello123.tk/services/content/math')).text(); }; $store.contentCurrent = 'math'; " >Math <span x-html="datab"></span></button><button :class="$store.contentCurrent=='notes' ? 'button bg-white' : 'button cyan'" x-data="{datab: '<span></span>', children: {}, present: false}" @click=" children = document.querySelector('#content').childNodes; children.forEach(li => { if (li.id == 'content-notes') {present = true}; }); if (!present) { datab = await (await fetch('https://hello123.tk/services/content/notes')).text(); }; $store.contentCurrent = 'notes'; " >Notes <span x-html="datab"></span></button></div></div>`);
});
export default app;
