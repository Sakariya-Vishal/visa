import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), tailwind()],
  // output: "server",
  // adapter: netlify(),
    // site: 'https://Pithiya-Nilesh.github.io',
    // base: '/astro-sanskar',
});