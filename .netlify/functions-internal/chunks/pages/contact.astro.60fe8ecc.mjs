/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.497f965b.mjs';
import 'html-escaper';
import { a as $$Layout } from './about.astro.cd3ae12f.mjs';
import { FrappeApp } from 'frappe-js-sdk';
import 'cookie';
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
const $$Astro = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  if (Astro2.request.method === "POST") {
    try {
      let getToken = function() {
        return `${"9e2ef2e2e996e90"}:${"9a45aa1773c5ac3"}`;
      };
      const data = await Astro2.request.formData();
      const name = data.get("name");
      const email = data.get("email");
      const phone = data.get("phone");
      const frappe = new FrappeApp("https://bestdeed.org", {
        useToken: true,
        token: () => getToken(),
        type: "token"
      });
      const db = frappe.db();
      db.createDoc("Astro Contact Form", {
        first_name: name,
        email,
        mobile_no: phone
      }).then((doc) => {
        console.log(doc);
      }).catch((error) => console.error(error));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div class="mx-5 md:max-w-7xl md:mx-auto md:px-24 my-28 mb-64 bg-white">
    <form method="POST" class="">
      <div class="mb-2 md:mb-4 lg:mb-6">
        <label class="block text-[#3E96F4] text-base mb-2" for="name">
          First Name <span class="text-red-600">*</span></label>
        <input class="bg-white appearance-none border-gray-300 placeholder-gray-400 hover:border-[#40b751] rounded w-full py-2 px-3 text-grey-darker" placeholder=" Enter Full Name" name="name" type="text">
      </div>
      <div class="mb-2 md:mb-4 lg:mb-6">
        <label class="block text-[#3E96F4] text-base mb-2" for="email">
          Email <span class="text-red-600">*</span></label>
        <input class="bg-white appearance-none border-gray-300 placeholder-gray-400 hover:border-[#40b751] rounded w-full py-2 px-3 text-grey-darker" placeholder=" Enter Full Name" name="email" type="text">
      </div>
      <div class="mb-2 md:mb-4 lg:mb-6">
        <label class="block text-[#3E96F4] text-base mb-2" for="mobile">
          Mobile <span class="text-red-600">*</span></label>
        <input class="bg-white appearance-none border-gray-300 placeholder-gray-400 hover:border-[#40b751] rounded w-full py-2 px-3 text-grey-darker" placeholder=" Enter Full Name" name="phone" type="text">
      </div>
      <button class="bg-white appearance-none transition campaign-request py-2 px-2 text-grey-darker hover:bg-transparent text-black hover:text-gray-500 tracking-wide border border-gray-500 hover:border-gray-500 text-base uppercase rounded">
        Submit
      </button>
    </form>
  </div>
` })}`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/contact.astro", void 0);

const $$file = "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/contact.astro";
const $$url = "/contact";

export { $$Contact as default, $$file as file, $$url as url };
