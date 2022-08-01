// src/index.ts
import { Hono } from 'hono';
import { html } from 'hono/html';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

app.get('/', (c) => {
  //c.header('Cache-Control', 'private, max-age=60')
  return c.html(
    html`<h1
      x-data="{ message: 'content2' }"
      x-text="message"
    ></h1>
    <p>Amet nisi lorem animi illo dolorum. Iste sed vero recusandae asperiores sint Natus nihil hic placeat in perferendis. Eos praesentium corrupti placeat praesentium officia. Accusantium sint repellendus distinctio est earum. Libero reiciendis fuga hic numquam similique? Hic maiores temporibus doloremque nostrum praesentium Explicabo amet modi natus temporibus blanditiis! Cupiditate fuga aliquid doloremque ut omnis? Doloribus dolor aut expedita cum iste? Vitae expedita dolorem voluptatum nisi consequuntur. Cupiditate doloribus nemo suscipit eius necessitatibus Corporis repellendus ipsum voluptates eum maiores Quis nobis rerum fugiat distinctio placeat magni doloribus ipsa omnis? Amet asperiores minima expedita molestias saepe Laudantium fuga dicta dolores voluptas ad</p>
    <p>Sit asperiores quia facere id cumque. Minima laborum a commodi aperiam sit Nemo architecto sit sunt placeat itaque Vel quaerat earum cupiditate at ratione perferendis praesentium. Accusantium tenetur labore veritatis blanditiis odit Minima consectetur accusamus officiis unde laboriosam Labore pariatur ad totam recusandae alias qui quis mollitia. Saepe molestiae nemo placeat dolore nulla ullam sed Quis saepe tenetur nostrum aliquid quibusdam nostrum? Reiciendis consectetur excepturi saepe unde ipsa Labore accusamus perspiciatis inventore eveniet tenetur, omnis Sint id expedita quibusdam quam fugit Assumenda numquam quos debitis hic esse vero exercitationem, nihil mollitia. Et voluptatibus provident architecto eligendi quod ut assumenda Vel!</p>
    <p>Sit perferendis eveniet ratione maiores ut Quaerat nostrum vitae expedita doloribus saepe. Delectus dolorum eos nihil deserunt tempora Accusamus iure inventore officia expedita quia quasi iusto. Nam iusto repudiandae consequuntur sapiente sint, nostrum voluptatum expedita Iste veritatis vel quidem cumque possimus? Minus corrupti similique possimus commodi ipsum Quae ratione commodi nam facilis aperiam mollitia Odio voluptatum aut magnam maxime magni. Quaerat at illum odio doloribus rem Odit obcaecati neque autem ipsam deleniti Facilis amet tempora adipisci eaque laborum Ut sint commodi asperiores eum nulla quidem ratione tenetur. Exercitationem autem unde sequi ex nihil Quisquam ex rem harum commodi ut assumenda.</p>
    `
  );
});

export default app;
