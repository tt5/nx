import { Hono } from 'hono';
import { html } from 'hono/html';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

app.get('/', (c) => {
  return c.html(
    html`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>My Homepage</title>
          <link
            rel="shortcut icon"
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='.8 .8 14.4 14.4'><path d='M10 8.99a1 1 0 00-.695 1.717l4.004 4a1 1 0 101.414-1.414l-4.004-4A1 1 0 0010 8.99z' fill='%2380b0ff' stroke='%235D7FDDaa' stroke-width='.3'/><path d='M6.508 1C3.48 1 1.002 3.474 1.002 6.5S3.48 12 6.508 12s5.504-2.474 5.504-5.5S9.536 1 6.508 1zm0 2a3.486 3.486 0 013.504 3.5c0 1.944-1.556 3.5-3.504 3.5a3.488 3.488 0 01-3.506-3.5C3.002 4.556 4.56 3 6.508 3z' fill='%2380b0ff' stroke='%235D7FDDaa' stroke-width='.3'/></svg>"
          />
          <style>
            /*! tailwindcss v3.1.6 | MIT License | https://tailwindcss.com*/
            *,
            :after,
            :before {
              box-sizing: border-box;
              border: 0 solid #e5e7eb;
            }
            :after,
            :before {
              --tw-content: '';
            }
            html {
              line-height: 1.5;
              -webkit-text-size-adjust: 100%;
              -moz-tab-size: 4;
              -o-tab-size: 4;
              tab-size: 4;
              font-family: Lato, sans-serif;
            }
            body {
              margin: 0;
              line-height: inherit;
            }
            hr {
              height: 0;
              color: inherit;
              border-top-width: 1px;
            }
            abbr:where([title]) {
              -webkit-text-decoration: underline dotted;
              text-decoration: underline dotted;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-size: inherit;
              font-weight: inherit;
            }
            a {
              color: inherit;
              text-decoration: inherit;
            }
            b,
            strong {
              font-weight: bolder;
            }
            code,
            kbd,
            pre,
            samp {
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
                Liberation Mono, Courier New, monospace;
              font-size: 1em;
            }
            small {
              font-size: 80%;
            }
            sub,
            sup {
              font-size: 75%;
              line-height: 0;
              position: relative;
              vertical-align: initial;
            }
            sub {
              bottom: -0.25em;
            }
            sup {
              top: -0.5em;
            }
            table {
              text-indent: 0;
              border-color: inherit;
              border-collapse: collapse;
            }
            button,
            input,
            optgroup,
            select,
            textarea {
              font-family: inherit;
              font-size: 100%;
              font-weight: inherit;
              line-height: inherit;
              color: inherit;
              margin: 0;
              padding: 0;
            }
            button,
            select {
              text-transform: none;
            }
            [type='button'],
            [type='reset'],
            [type='submit'],
            button {
              -webkit-appearance: button;
              background-color: initial;
              background-image: none;
            }
            :-moz-focusring {
              outline: auto;
            }
            :-moz-ui-invalid {
              box-shadow: none;
            }
            progress {
              vertical-align: initial;
            }
            ::-webkit-inner-spin-button,
            ::-webkit-outer-spin-button {
              height: auto;
            }
            [type='search'] {
              -webkit-appearance: textfield;
              outline-offset: -2px;
            }
            ::-webkit-search-decoration {
              -webkit-appearance: none;
            }
            ::-webkit-file-upload-button {
              -webkit-appearance: button;
              font: inherit;
            }
            summary {
              display: list-item;
            }
            blockquote,
            dd,
            dl,
            figure,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            hr,
            p,
            pre {
              margin: 0;
            }
            fieldset {
              margin: 0;
            }
            fieldset,
            legend {
              padding: 0;
            }
            menu,
            ol,
            ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            textarea {
              resize: vertical;
            }
            input::-moz-placeholder,
            textarea::-moz-placeholder {
              opacity: 1;
              color: #9ca3af;
            }
            input:-ms-input-placeholder,
            textarea:-ms-input-placeholder {
              opacity: 1;
              color: #9ca3af;
            }
            input::placeholder,
            textarea::placeholder {
              opacity: 1;
              color: #9ca3af;
            }
            [role='button'],
            button {
              cursor: pointer;
            }
            :disabled {
              cursor: default;
            }
            audio,
            canvas,
            embed,
            iframe,
            img,
            object,
            svg,
            video {
              display: block;
              vertical-align: middle;
            }
            img,
            video {
              max-width: 100%;
              height: auto;
            }
            *,
            :after,
            :before {
              --tw-border-spacing-x: 0;
              --tw-border-spacing-y: 0;
              --tw-translate-x: 0;
              --tw-translate-y: 0;
              --tw-rotate: 0;
              --tw-skew-x: 0;
              --tw-skew-y: 0;
              --tw-scale-x: 1;
              --tw-scale-y: 1;
              --tw-pan-x: ;
              --tw-pan-y: ;
              --tw-pinch-zoom: ;
              --tw-scroll-snap-strictness: proximity;
              --tw-ordinal: ;
              --tw-slashed-zero: ;
              --tw-numeric-figure: ;
              --tw-numeric-spacing: ;
              --tw-numeric-fraction: ;
              --tw-ring-inset: ;
              --tw-ring-offset-width: 0px;
              --tw-ring-offset-color: #fff;
              --tw-ring-color: #3b82f680;
              --tw-ring-offset-shadow: 0 0 #0000;
              --tw-ring-shadow: 0 0 #0000;
              --tw-shadow: 0 0 #0000;
              --tw-shadow-colored: 0 0 #0000;
              --tw-blur: ;
              --tw-brightness: ;
              --tw-contrast: ;
              --tw-grayscale: ;
              --tw-hue-rotate: ;
              --tw-invert: ;
              --tw-saturate: ;
              --tw-sepia: ;
              --tw-drop-shadow: ;
              --tw-backdrop-blur: ;
              --tw-backdrop-brightness: ;
              --tw-backdrop-contrast: ;
              --tw-backdrop-grayscale: ;
              --tw-backdrop-hue-rotate: ;
              --tw-backdrop-invert: ;
              --tw-backdrop-opacity: ;
              --tw-backdrop-saturate: ;
              --tw-backdrop-sepia: ;
            }
            ::-webkit-backdrop {
              --tw-border-spacing-x: 0;
              --tw-border-spacing-y: 0;
              --tw-translate-x: 0;
              --tw-translate-y: 0;
              --tw-rotate: 0;
              --tw-skew-x: 0;
              --tw-skew-y: 0;
              --tw-scale-x: 1;
              --tw-scale-y: 1;
              --tw-pan-x: ;
              --tw-pan-y: ;
              --tw-pinch-zoom: ;
              --tw-scroll-snap-strictness: proximity;
              --tw-ordinal: ;
              --tw-slashed-zero: ;
              --tw-numeric-figure: ;
              --tw-numeric-spacing: ;
              --tw-numeric-fraction: ;
              --tw-ring-inset: ;
              --tw-ring-offset-width: 0px;
              --tw-ring-offset-color: #fff;
              --tw-ring-color: #3b82f680;
              --tw-ring-offset-shadow: 0 0 #0000;
              --tw-ring-shadow: 0 0 #0000;
              --tw-shadow: 0 0 #0000;
              --tw-shadow-colored: 0 0 #0000;
              --tw-blur: ;
              --tw-brightness: ;
              --tw-contrast: ;
              --tw-grayscale: ;
              --tw-hue-rotate: ;
              --tw-invert: ;
              --tw-saturate: ;
              --tw-sepia: ;
              --tw-drop-shadow: ;
              --tw-backdrop-blur: ;
              --tw-backdrop-brightness: ;
              --tw-backdrop-contrast: ;
              --tw-backdrop-grayscale: ;
              --tw-backdrop-hue-rotate: ;
              --tw-backdrop-invert: ;
              --tw-backdrop-opacity: ;
              --tw-backdrop-saturate: ;
              --tw-backdrop-sepia: ;
            }
            ::backdrop {
              --tw-border-spacing-x: 0;
              --tw-border-spacing-y: 0;
              --tw-translate-x: 0;
              --tw-translate-y: 0;
              --tw-rotate: 0;
              --tw-skew-x: 0;
              --tw-skew-y: 0;
              --tw-scale-x: 1;
              --tw-scale-y: 1;
              --tw-pan-x: ;
              --tw-pan-y: ;
              --tw-pinch-zoom: ;
              --tw-scroll-snap-strictness: proximity;
              --tw-ordinal: ;
              --tw-slashed-zero: ;
              --tw-numeric-figure: ;
              --tw-numeric-spacing: ;
              --tw-numeric-fraction: ;
              --tw-ring-inset: ;
              --tw-ring-offset-width: 0px;
              --tw-ring-offset-color: #fff;
              --tw-ring-color: #3b82f680;
              --tw-ring-offset-shadow: 0 0 #0000;
              --tw-ring-shadow: 0 0 #0000;
              --tw-shadow: 0 0 #0000;
              --tw-shadow-colored: 0 0 #0000;
              --tw-blur: ;
              --tw-brightness: ;
              --tw-contrast: ;
              --tw-grayscale: ;
              --tw-hue-rotate: ;
              --tw-invert: ;
              --tw-saturate: ;
              --tw-sepia: ;
              --tw-drop-shadow: ;
              --tw-backdrop-blur: ;
              --tw-backdrop-brightness: ;
              --tw-backdrop-contrast: ;
              --tw-backdrop-grayscale: ;
              --tw-backdrop-hue-rotate: ;
              --tw-backdrop-invert: ;
              --tw-backdrop-opacity: ;
              --tw-backdrop-saturate: ;
              --tw-backdrop-sepia: ;
            }
            h1 {
              font-size: 1.875rem;
              line-height: 2.25rem;
            }
            .red {
              background-color: rgb(220 38 38 / var(--tw-bg-opacity));
            }
            .orange,
            .red {
              --tw-bg-opacity: 1;
            }
            .orange {
              background-color: rgb(249 115 22 / var(--tw-bg-opacity));
            }
            .yellow {
              background-color: rgb(253 224 71 / var(--tw-bg-opacity));
            }
            .green,
            .yellow {
              --tw-bg-opacity: 1;
            }
            .green {
              background-color: rgb(22 163 74 / var(--tw-bg-opacity));
            }
            .cyan {
              background-color: rgb(165 243 252 / var(--tw-bg-opacity));
            }
            .blue,
            .cyan {
              --tw-bg-opacity: 1;
            }
            .blue {
              background-color: rgb(29 78 216 / var(--tw-bg-opacity));
            }
            .magenta {
              --tw-bg-opacity: 1;
              background-color: rgb(217 70 239 / var(--tw-bg-opacity));
            }
          </style>
          <script
            defer
            src="https://unpkg.com/alpinejs@3.10.3/dist/cdn.min.js"
          ></script>
        </head>
        <body class="cyan">
          <nav
            x-data="{data: '...loading'}"
            x-init="data = await (await fetch('https://nav.tt5.workers.dev')).text();
  "
          >
            <span x-html="data"></span>
          </nav>
          <main
            x-data="{data: '...loading'}"
            x-init="data = await (await fetch('https://content.tt5.workers.dev')).text();
  "
          >
            <span x-html="data"></span>
          </main>
        </body>
      </html> `
  );
});

export default app;
