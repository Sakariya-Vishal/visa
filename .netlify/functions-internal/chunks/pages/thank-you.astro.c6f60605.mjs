/* empty css                                                                        */import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.890e48a2.mjs';
import 'html-escaper';
import { $ as $$Image, a as $$Layout } from './about.astro.735425c2.mjs';
/* empty css                           */import 'cookie';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import 'path-to-regexp';
import 'mime';
import 'string-width';
import 'image-size';
import 'node:fs/promises';
import 'node:url';
import 'node:path';
import 'http-cache-semantics';
import 'node:os';
import 'magic-string';
import 'node:stream';
/* empty css                           */
const thankyou_banner = {"src":"/_astro/thankyou_banner.119004c1.svg","width":481,"height":425,"format":"svg"};

const left = {"src":"/_astro/left.c1907db6.svg","width":8,"height":14,"format":"svg"};

const $$Astro = createAstro();
const $$ThankYou = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ThankYou;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sanskar Technolabs | Thank You", ",": true, "keyword": "", ",": true, "description": "", ",": true, "canonical_href": "https://sanskartechnolab.com/thank-you" }, { "default": ($$result2) => renderTemplate`
    ${maybeRenderHead()}<section class="h-[calc(100vh-10vh)] grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 md:gap-5 items-center mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0">
      <div class="order-2 sm:order-1">    
        <h1 class="text-[1.75rem] md:text-[3rem] !leading-[2.25rem] md:!leading-[3.5rem] text-[#31393C] font-semibold">
        Thank you for filling out
        the form. <span class="text-[#3E96F4]">We are GLAD!</span>
        </h1>
        <p class="text-[#31393C] leading-7 font-normal lg:text-base xl:text-lg mt-5">
        Our team will review your query and reach out to you within 5 business days.
        </p>
        <div class="mt-5 flex justify-start bg-[#3E96F4] rounded-lg px-3 md:px-3 lg:px-5 py-2 md:py-2 lg:py-3 md:w-44 sm:w-auto">
        ${renderComponent($$result2, "Image", $$Image, { "src": left, "width": 6, "height": 12, "alt": "left arrow " })}
        <a href="/" class="text-white text-base font-semibold font-inter ml-5">Back to Home</a>
        </div>
      </div>
      
        ${renderComponent($$result2, "Image", $$Image, { "src": thankyou_banner, "alt": "Thank You Banner", "class": "w-full order-1 sm:order-2 mx-0 md:mx-5" })}
      
    </section>
` })}`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/thank-you.astro", void 0);

const $$file = "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/thank-you.astro";
const $$url = "/thank-you";

export { $$ThankYou as default, $$file as file, $$url as url };
