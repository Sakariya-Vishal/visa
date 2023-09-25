import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), tailwind()],
  // output: "server",
  // adapter: netlify(),

  site: 'https://Pithiya-Nilesh.github.io',
  base: '/astro-sanskar',
  
  build: {
    cacheControl: {
      static: 60 * 60 * 24 * 365, // Cache static files for 1 year
    },
    // format: "file",
  },
});
