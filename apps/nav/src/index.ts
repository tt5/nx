import { Hono } from 'hono';
import { html } from 'hono/html';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

app.get('/', (c) => {
  //c.header('Cache-Control', 'private, max-age=60')
  return c.html(
    html`
<div class="min-v-screen max-v-screen flex">
  <div>
  <div
    x-data="{open: true}"
    style="position: relative"
  >
    <button
      x-init="$watch('open', (a) => { setTimeout(() => { open = true; }, '150') })"
      class="button yellow"
      style="position: absolute; top: 0; left: 0;"
    >
      <strong>tt5</strong>
    </button>
    <button
      style="position: absolute; top: 0; left: 0;"
      x-show="open" x-transition
      x-init="$watch('$store.contentCurrent', (a) => { open = true; })"
      :class="
        $store.contentCurrent=='home' ? 'button bg-white' : 'button cyan'
      "
      @click="
        open = false;
        if ($store.contentCurrent=='home') {}
        else {
          $store.contentCurrent = 'home';
        }
      "
    >
      <strong>tt5</strong>
    </button>
  </div>
  </div>
  <div class="flex-grow"></div>
  <div class="flex gap-2">
    <div
      x-data="{open: true}"
      style="position: relative"
      class="button"
    >
      <button
        x-init="$watch('open', (a) => { setTimeout(() => { open = true; }, '150') })"
        class="button yellow"
        style="position: absolute; top: 0; left: 0;"
      >
        Chess
      </button>
      <button
        style="position: absolute; top: 0; left: 0;"
        x-show="open" x-transition
        x-init="$watch('$store.contentCurrent', (a) => { open = true; })"
        :class="$store.contentCurrent=='chess' ? 'button bg-white' : 'button cyan'"
        x-data="{datab: '<span></span>', children: {}, present: false}"
        @click="
          open = false;
          children = document.querySelector('#content').childNodes;
          children.forEach(li => {
            if (li.id == 'content-chess') {present = true};
          });
          if (!present) {
            datab = await (await fetch('https://hello123.tk/services/content/chess')).text();
          };
          $store.contentCurrent = 'chess';
        "
      >Chess
        <span x-html="datab"></span>
      </button>
    </div>
    <button
      :class="$store.contentCurrent=='math' ? 'button bg-white' : 'button cyan'"
      x-data="{datab: '<span></span>', children: {}, present: false}"
      @click="
      children = document.querySelector('#content').childNodes;
      children.forEach(li => {
        if (li.id == 'content-math') {present = true};
      });
      if (!present) {
        datab = await (await fetch('https://hello123.tk/services/content/math')).text();
      };
      $store.contentCurrent = 'math';
      "
    >Math
      <span x-html="datab"></span>
    </button>
    <button
      :class="$store.contentCurrent=='notes' ? 'button bg-white' : 'button cyan'"
      x-data="{datab: '<span></span>', children: {}, present: false}"
      @click="
      children = document.querySelector('#content').childNodes;
      children.forEach(li => {
        if (li.id == 'content-notes') {present = true};
      });
      if (!present) {
        datab = await (await fetch('https://hello123.tk/services/content/notes')).text();
      };
      $store.contentCurrent = 'notes';
      "
      >Notes
      <span x-html="datab"></span>
    </button>
  </div>
</div>
    `
  );
});

export default app;
