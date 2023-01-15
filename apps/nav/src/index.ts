import { Hono } from 'hono';
import { html, raw } from 'hono/html';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

const buttonClicked = (text) => html`
  <button
    x-init="$watch('open', (a) => { setTimeout(() => { open = true; }, '150') })"
    class="button yellow"
    style="position: absolute; top: 0; left: 0;"
  >
    ${raw(text)}
  </button>
`;

app.get('/', (c) => {
  //c.header('Cache-Control', 'private, max-age=60')
  return c.html(
    html`
      <div
        class="min-v-screen max-v-screen flex"
        style="font-size: 1.125rem;"
      >
        <div>
          <div
            x-data="{open: true}"
            style="position: relative"
          >
            ${buttonClicked('<strong>tt5</strong>')}
            <button
              style="position: absolute; top: 0; left: 0;"
              x-show="open"
              x-transition
              x-init="$watch('$store.contentCurrent', (a) => { open = true; })"
              :class="$store.contentCurrent=='home' ? 'button bg-white' : 'button cyan'"
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
        <div 
          id="event"
          class="flex-grow"
          x-data='{event: "event", result: "result"}'
          x-init='
            event = new EventSource("https://tt15551.cc/events/event");
            event.onmessage = function (e) {
              result = e.data
            };
          '
        >
          <span x-text="result"></span>
        </div>
        <div class="flex gap-2">
          <div
            x-data="{open: true}"
            style="position: relative"
            class="button"
          >
            ${buttonClicked('Chess')}
            <button
              style="position: absolute; top: 0; left: 0;"
              x-show="open"
              x-transition
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
            datab = await (await fetch('https://tt15551.cc/services/content/chess')).text();
          };
          $store.contentCurrent = 'chess';
        "
            >
              Chess
              <span x-html="datab"></span>
            </button>
          </div>
          <div
            x-data="{open: true}"
            style="position: relative"
            class="button"
          >
            ${buttonClicked('Math')}
            <button
              style="position: absolute; top: 0; left: 0;"
              x-show="open"
              x-transition
              x-init="$watch('$store.contentCurrent', (a) => { open = true; })"
              :class="$store.contentCurrent=='math' ? 'button bg-white' : 'button cyan'"
              x-data="{datab: '<span></span>', children: {}, present: false}"
              @click="
          open = false;
          children = document.querySelector('#content').childNodes;
          children.forEach(li => {
            if (li.id == 'content-math') {present = true};
          });
          if (!present) {
            datab = await (await fetch('https://tt15551.cc/services/content/math')).text();
          };
          $store.contentCurrent = 'math';
        "
            >
              Math
              <span x-html="datab"></span>
            </button>
          </div>
          <div
            x-data="{open: true}"
            style="position: relative"
            class="button"
          >
            ${buttonClicked('Notes')}
            <button
              style="position: absolute; top: 0; left: 0;"
              x-show="open"
              x-transition
              x-init="$watch('$store.contentCurrent', (a) => { open = true; })"
              :class="$store.contentCurrent=='notes' ? 'button bg-white' : 'button cyan'"
              x-data="{datab: '<span></span>', children: {}, present: false}"
              @click="
          open = false;
          children = document.querySelector('#content').childNodes;
          children.forEach(li => {
            if (li.id == 'content-notes') {present = true};
          });
          if (!present) {
            datab = await (await fetch('https://tt15551.cc/services/content/notes')).text();
          };
          $store.contentCurrent = 'notes';
        "
            >
              Notes
              <span x-html="datab"></span>
            </button>
          </div>
        </div>
      </div>
    `
  );
});

export default app;
