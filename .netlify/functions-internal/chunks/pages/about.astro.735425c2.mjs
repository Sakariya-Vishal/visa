import { dim, bold, red, yellow, cyan, green } from 'kleur/colors';
import sizeOf from 'image-size';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import 'node:path';
import 'http-cache-semantics';
import 'node:os';
import 'magic-string';
import mime from 'mime';
import 'node:stream';
/* empty css                                                                        */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, b as addAttribute, d as renderComponent, e as renderSlot, f as renderHead } from '../astro.890e48a2.mjs';
import 'html-escaper';
/* empty css                           *//* empty css                           */
const PREFIX = "@astrojs/image";
const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function getPrefix(level, timestamp) {
  let prefix = "";
  if (timestamp) {
    prefix += dim(dateTimeFormat.format(/* @__PURE__ */ new Date()) + " ");
  }
  switch (level) {
    case "debug":
      prefix += bold(green(`[${PREFIX}] `));
      break;
    case "info":
      prefix += bold(cyan(`[${PREFIX}] `));
      break;
    case "warn":
      prefix += bold(yellow(`[${PREFIX}] `));
      break;
    case "error":
      prefix += bold(red(`[${PREFIX}] `));
      break;
  }
  return prefix;
}
const log = (_level, dest) => ({ message, level, prefix = true, timestamp = true }) => {
  if (levels[_level] >= levels[level]) {
    dest(`${prefix ? getPrefix(level, timestamp) : ""}${message}`);
  }
};
const error = log("error", console.error);

async function metadata(src, data) {
  const file = data || await fs.readFile(src);
  const { width, height, type, orientation } = sizeOf(file);
  const isPortrait = (orientation || 0) >= 5;
  if (!width || !height || !type) {
    return void 0;
  }
  return {
    // We shouldn't call fileURLToPath function if it starts with /@astroimage/ because it will throw Invalid URL error
    src: typeof src === "string" && /^[\/\\]?@astroimage/.test(src) ? src : fileURLToPath(src),
    width: isPortrait ? height : width,
    height: isPortrait ? width : height,
    format: type,
    orientation
  };
}

function isRemoteImage(src) {
  return /^(https?:)?\/\//.test(src);
}
function removeQueryString(src) {
  const index = src.lastIndexOf("?");
  return index > 0 ? src.substring(0, index) : src;
}
function extname(src) {
  const base = basename(src);
  const index = base.lastIndexOf(".");
  if (index <= 0) {
    return "";
  }
  return base.substring(index);
}
function basename(src) {
  return removeQueryString(src.replace(/^.*[\\\/]/, ""));
}

function isOutputFormat(value) {
  return ["avif", "jpeg", "jpg", "png", "webp", "svg"].includes(value);
}
function isAspectRatioString(value) {
  return /^\d*:\d*$/.test(value);
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio) {
    return void 0;
  }
  if (typeof aspectRatio === "number") {
    return aspectRatio;
  } else {
    const [width, height] = aspectRatio.split(":");
    return parseInt(width) / parseInt(height);
  }
}
function isSSRService(service) {
  return "transform" in service;
}
class BaseSSRService {
  async getImageAttributes(transform) {
    const { width, height, src, format, quality, aspectRatio, ...rest } = transform;
    return {
      ...rest,
      width,
      height
    };
  }
  serializeTransform(transform) {
    const searchParams = new URLSearchParams();
    if (transform.quality) {
      searchParams.append("q", transform.quality.toString());
    }
    if (transform.format) {
      searchParams.append("f", transform.format);
    }
    if (transform.width) {
      searchParams.append("w", transform.width.toString());
    }
    if (transform.height) {
      searchParams.append("h", transform.height.toString());
    }
    if (transform.aspectRatio) {
      searchParams.append("ar", transform.aspectRatio.toString());
    }
    if (transform.fit) {
      searchParams.append("fit", transform.fit);
    }
    if (transform.background) {
      searchParams.append("bg", transform.background);
    }
    if (transform.position) {
      searchParams.append("p", encodeURI(transform.position));
    }
    searchParams.append("href", transform.src);
    return { searchParams };
  }
  parseTransform(searchParams) {
    if (!searchParams.has("href")) {
      return void 0;
    }
    let transform = { src: searchParams.get("href") };
    if (searchParams.has("q")) {
      transform.quality = parseInt(searchParams.get("q"));
    }
    if (searchParams.has("f")) {
      const format = searchParams.get("f");
      if (isOutputFormat(format)) {
        transform.format = format;
      }
    }
    if (searchParams.has("w")) {
      transform.width = parseInt(searchParams.get("w"));
    }
    if (searchParams.has("h")) {
      transform.height = parseInt(searchParams.get("h"));
    }
    if (searchParams.has("ar")) {
      const ratio = searchParams.get("ar");
      if (isAspectRatioString(ratio)) {
        transform.aspectRatio = ratio;
      } else {
        transform.aspectRatio = parseFloat(ratio);
      }
    }
    if (searchParams.has("fit")) {
      transform.fit = searchParams.get("fit");
    }
    if (searchParams.has("p")) {
      transform.position = decodeURI(searchParams.get("p"));
    }
    if (searchParams.has("bg")) {
      transform.background = searchParams.get("bg");
    }
    return transform;
  }
}

function resolveSize(transform) {
  if (transform.width && transform.height) {
    return transform;
  }
  if (!transform.width && !transform.height) {
    throw new Error(`"width" and "height" cannot both be undefined`);
  }
  if (!transform.aspectRatio) {
    throw new Error(
      `"aspectRatio" must be included if only "${transform.width ? "width" : "height"}" is provided`
    );
  }
  let aspectRatio;
  if (typeof transform.aspectRatio === "number") {
    aspectRatio = transform.aspectRatio;
  } else {
    const [width, height] = transform.aspectRatio.split(":");
    aspectRatio = Number.parseInt(width) / Number.parseInt(height);
  }
  if (transform.width) {
    return {
      ...transform,
      width: transform.width,
      height: Math.round(transform.width / aspectRatio)
    };
  } else if (transform.height) {
    return {
      ...transform,
      width: Math.round(transform.height * aspectRatio),
      height: transform.height
    };
  }
  return transform;
}
async function resolveTransform(input) {
  if (typeof input.src === "string") {
    return resolveSize(input);
  }
  const metadata = "then" in input.src ? (await input.src).default : input.src;
  let { width, height, aspectRatio, background, format = metadata.format, ...rest } = input;
  if (!width && !height) {
    width = metadata.width;
    height = metadata.height;
  } else if (width) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    height = height || Math.round(width / ratio);
  } else if (height) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    width = width || Math.round(height * ratio);
  }
  return {
    ...rest,
    src: metadata.src,
    width,
    height,
    aspectRatio,
    format,
    background
  };
}
async function getImage(transform) {
  var _a, _b, _c;
  if (!transform.src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  let loader = (_a = globalThis.astroImage) == null ? void 0 : _a.loader;
  if (!loader) {
    const { default: mod } = await import('./endpoint.js.f2fe83be.mjs').then(n => n.s).catch(() => {
      throw new Error(
        "[@astrojs/image] Builtin image loader not found. (Did you remember to add the integration to your Astro config?)"
      );
    });
    loader = mod;
    globalThis.astroImage = globalThis.astroImage || {};
    globalThis.astroImage.loader = loader;
  }
  const resolved = await resolveTransform(transform);
  const attributes = await loader.getImageAttributes(resolved);
  const isDev = (_b = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":true,"SITE":undefined,"ASSETS_PREFIX":undefined},{_:process.env._,SSR:true,}))) == null ? void 0 : _b.DEV;
  const isLocalImage = !isRemoteImage(resolved.src);
  const _loader = isDev && isLocalImage ? globalThis.astroImage.defaultLoader : loader;
  if (!_loader) {
    throw new Error("@astrojs/image: loader not found!");
  }
  const { searchParams } = isSSRService(_loader) ? _loader.serializeTransform(resolved) : globalThis.astroImage.defaultLoader.serializeTransform(resolved);
  const imgSrc = !isLocalImage && resolved.src.startsWith("//") ? `https:${resolved.src}` : resolved.src;
  let src;
  if (/^[\/\\]?@astroimage/.test(imgSrc)) {
    src = `${imgSrc}?${searchParams.toString()}`;
  } else {
    searchParams.set("href", imgSrc);
    src = `/_image?${searchParams.toString()}`;
  }
  if ((_c = globalThis.astroImage) == null ? void 0 : _c.addStaticImage) {
    src = globalThis.astroImage.addStaticImage(resolved);
  }
  return {
    ...attributes,
    src
  };
}

async function resolveAspectRatio({ src, aspectRatio }) {
  if (typeof src === "string") {
    return parseAspectRatio(aspectRatio);
  } else {
    const metadata = "then" in src ? (await src).default : src;
    return parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
  }
}
async function resolveFormats({ src, formats }) {
  const unique = new Set(formats);
  if (typeof src === "string") {
    unique.add(extname(src).replace(".", ""));
  } else {
    const metadata = "then" in src ? (await src).default : src;
    unique.add(extname(metadata.src).replace(".", ""));
  }
  return Array.from(unique).filter(Boolean);
}
async function getPicture(params) {
  const { src, alt, widths, fit, position, background } = params;
  if (!src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  if (!widths || !Array.isArray(widths)) {
    throw new Error("[@astrojs/image] at least one `width` is required. ex: `widths={[100]}`");
  }
  const aspectRatio = await resolveAspectRatio(params);
  if (!aspectRatio) {
    throw new Error("`aspectRatio` must be provided for remote images");
  }
  const allFormats = await resolveFormats(params);
  const lastFormat = allFormats[allFormats.length - 1];
  const maxWidth = Math.max(...widths);
  let image;
  async function getSource(format) {
    const imgs = await Promise.all(
      widths.map(async (width) => {
        var _a;
        const img = await getImage({
          src,
          alt,
          format,
          width,
          fit,
          position,
          background,
          aspectRatio
        });
        if (format === lastFormat && width === maxWidth) {
          image = img;
        }
        return `${(_a = img.src) == null ? void 0 : _a.replaceAll(" ", encodeURI)} ${width}w`;
      })
    );
    return {
      type: mime.getType(format) || format,
      srcset: imgs.join(",")
    };
  }
  const sources = await Promise.all(allFormats.map((format) => getSource(format)));
  return {
    sources,
    // @ts-expect-error image will always be defined
    image
  };
}

const $$Astro$5 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Image;
  const { loading = "lazy", decoding = "async", ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    warnForMissingAlt();
  }
  const attrs = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${spreadAttributes(attrs)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}>`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/node_modules/@astrojs/image/components/Image.astro", void 0);

const $$Astro$4 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Picture;
  const {
    src,
    alt,
    sizes,
    widths,
    aspectRatio,
    fit,
    background,
    position,
    formats = ["avif", "webp"],
    loading = "lazy",
    decoding = "async",
    ...attrs
  } = Astro2.props;
  if (alt === void 0 || alt === null) {
    warnForMissingAlt();
  }
  const { image, sources } = await getPicture({
    src,
    widths,
    formats,
    aspectRatio,
    fit,
    background,
    position,
    alt
  });
  delete image.width;
  delete image.height;
  return renderTemplate`${maybeRenderHead()}<picture>
	${sources.map((attrs2) => renderTemplate`<source${spreadAttributes(attrs2)}${addAttribute(sizes, "sizes")}>`)}
	<img${spreadAttributes(image)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${spreadAttributes(attrs)}>
</picture>`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/node_modules/@astrojs/image/components/Picture.astro", void 0);

let altWarningShown = false;
function warnForMissingAlt() {
  if (altWarningShown === true) {
    return;
  }
  altWarningShown = true;
  console.warn(`
[@astrojs/image] "alt" text was not provided for an <Image> or <Picture> component.

A future release of @astrojs/image may throw a build error when "alt" text is missing.

The "alt" attribute holds a text description of the image, which isn't mandatory but is incredibly useful for accessibility. Set to an empty string (alt="") if the image is not a key part of the content (it's decoration or a tracking pixel).
`);
}

const logo = {"src":"/_astro/logo.cdcafd8d.svg","width":201,"height":57,"format":"svg"};

const down_arrow = {"src":"/_astro/down-arrow.c0b55f95.svg","width":15,"height":9,"format":"svg"};

const $$Astro$3 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navbar;
  return renderTemplate`${maybeRenderHead()}<nav class="border-b-2 p-5 bg-white astro-5KNYCIEN">
  <div class="md:max-w-7xl md:mx-auto md:px-24 flex flex-wrap items-center justify-between astro-5KNYCIEN">
    <a href="/" class="w-4/12 md:w-auto grow flex items-center flex-shrink-0 text-white mr-6 hover:cursor-pointer astro-5KNYCIEN">
      ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "logo", "class": "astro-5KNYCIEN" })}

      <!-- <svg
                width="201"
                height="57"
                viewBox="0 0 201 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M52.2043 28.2012H49.5043C48.9399 28.1954 48.3864 28.0453 47.8963 27.7653C47.4062 27.4853 46.9959 27.0846 46.7043 26.6013L44.9043 23.2014H33.5043L31.7043 26.6013C31.4059 27.0783 30.994 27.474 30.5054 27.7531C30.0169 28.0323 29.4668 28.1862 28.9043 28.2012H26.3043C26.0321 28.2059 25.7634 28.1392 25.525 28.0079C25.2865 27.8766 25.0865 27.6851 24.945 27.4526C24.8034 27.22 24.7252 26.9545 24.7181 26.6824C24.7109 26.4102 24.7752 26.1409 24.9043 25.9013L37.8043 1.70231C37.9427 1.45224 38.1455 1.24379 38.3917 1.09864C38.6379 0.953492 38.9185 0.876938 39.2043 0.876938C39.4901 0.876938 39.7707 0.953492 40.0169 1.09864C40.2631 1.24379 40.466 1.45224 40.6043 1.70231L53.6043 25.9013C53.7335 26.1409 53.7977 26.4102 53.7906 26.6824C53.7835 26.9545 53.7052 27.22 53.5637 27.4526C53.4221 27.6851 53.2222 27.8766 52.9837 28.0079C52.7452 28.1392 52.4765 28.2059 52.2043 28.2012ZM42.5043 18.6016L40.6043 15.1017C40.466 14.8517 40.2631 14.6432 40.0169 14.4981C39.7707 14.3529 39.4901 14.2764 39.2043 14.2764C38.9185 14.2764 38.6379 14.3529 38.3917 14.4981C38.1455 14.6432 37.9427 14.8517 37.8043 15.1017L36.0043 18.6016H42.5043Z"
                    fill="#1E0B4B"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M172.304 28.2012H169.704C169.135 28.2193 168.573 28.0794 168.078 27.797C167.584 27.5145 167.178 27.1007 166.904 26.6013L165.104 23.2014H153.604L151.804 26.6013C151.515 27.0865 151.105 27.4888 150.615 27.7691C150.124 28.0494 149.569 28.1983 149.004 28.2012H146.404C146.136 28.1948 145.874 28.1211 145.642 27.987C145.41 27.8528 145.216 27.6626 145.076 27.4336C144.937 27.2047 144.857 26.9444 144.845 26.6766C144.832 26.4089 144.887 26.1423 145.004 25.9013L158.004 1.70231C158.143 1.45224 158.346 1.24379 158.592 1.09864C158.838 0.953492 159.119 0.876938 159.404 0.876938C159.69 0.876938 159.971 0.953492 160.217 1.09864C160.463 1.24379 160.666 1.45224 160.804 1.70231L173.704 25.9013C173.834 26.1409 173.898 26.4102 173.891 26.6824C173.884 26.9545 173.805 27.22 173.664 27.4526C173.522 27.6851 173.322 27.8766 173.084 28.0079C172.845 28.1392 172.577 28.2059 172.304 28.2012ZM162.604 18.6016L160.704 15.1017C160.566 14.8517 160.363 14.6432 160.117 14.4981C159.871 14.3529 159.59 14.2764 159.304 14.2764C159.019 14.2764 158.738 14.3529 158.492 14.4981C158.246 14.6432 158.043 14.8517 157.904 15.1017L156.104 18.6016H162.604Z"
                    fill="#1E0B4B"></path>
                <path
                    d="M20.3044 19.7015C20.3851 20.8809 20.1925 22.0629 19.7415 23.1556C19.2905 24.2483 18.5934 25.2221 17.7044 26.0013C16.0159 27.5457 13.7917 28.3708 11.5044 28.3012C8.85012 28.3055 6.2138 27.8661 3.70439 27.0012C0.804391 26.0013 0.504395 24.6013 0.504395 23.6014V23.1014C0.529417 22.1917 0.769278 21.3008 1.20439 20.5015C5.30439 22.3014 8.3044 23.1014 10.3044 23.1014H10.8044C13.5044 22.9014 14.8044 22.1014 14.8044 20.5015C14.8133 19.8304 14.6034 19.1746 14.2065 18.6334C13.8095 18.0922 13.2472 17.6949 12.6044 17.5016C11.1166 16.7912 9.57926 16.1896 8.00439 15.7017C5.60439 14.9017 5.0044 14.5018 4.9044 14.3018H4.8044V14.2018C3.87911 13.6354 3.13396 12.8177 2.65589 11.8439C2.17782 10.8701 1.98655 9.7804 2.10439 8.702C2.07344 7.55575 2.27808 6.41533 2.70564 5.35135C3.13321 4.28736 3.7746 3.32244 4.59013 2.51632C5.40566 1.7102 6.37797 1.08003 7.44687 0.664808C8.51577 0.249587 9.65853 0.0581547 10.8044 0.10236H11.1044C13.5744 0.10236 16.6344 0.932325 20.3044 2.60226C20.1724 3.24419 20.0055 3.87844 19.8044 4.50218C19.7971 4.57896 19.7614 4.65027 19.7044 4.70217C19.3044 5.80212 18.7044 6.60209 17.9044 6.60209H17.5044C14.3044 5.50213 12.1044 4.90216 10.5044 4.90216C10.0864 4.86731 9.66574 4.9205 9.26957 5.05829C8.8734 5.19608 8.51054 5.41541 8.20439 5.70213C7.97397 5.93669 7.80015 6.22076 7.69617 6.53269C7.5922 6.84461 7.5608 7.17616 7.60439 7.50205C7.64426 8.13455 7.86273 8.74277 8.23445 9.25607C8.60617 9.76938 9.11588 10.1667 9.70439 10.4019C11.1891 11.1471 12.7266 11.7821 14.3044 12.3019C15.4647 12.6112 16.5756 13.0824 17.6044 13.7018C18.502 14.4126 19.2157 15.3286 19.6855 16.3727C20.1554 17.4167 20.3676 18.5584 20.3044 19.7015Z"
                    fill="#1E0B4B"></path>
                <path
                    d="M83.4044 0.902313V25.5013C83.4044 26.9012 82.9044 28.2012 80.2044 28.2012C79.6466 28.236 79.0881 28.1464 78.5693 27.9389C78.0504 27.7313 77.5842 27.4111 77.2044 27.0012L67.5044 15.4017L65.6044 13.1018V25.5013C65.6044 26.9012 65.2044 28.2012 62.4044 28.2012H59.1044V1.00231H62.4044C62.9648 0.936878 63.5327 1.01235 64.0565 1.22189C64.5804 1.43143 65.0437 1.7684 65.4044 2.20226L65.5044 2.30225H65.4044L75.0044 13.7018L76.9044 16.0017V3.6022C76.9044 2.20226 77.3044 0.902313 80.1044 0.902313H83.4044Z"
                    fill="#1E0B4B"></path>
                <path
                    d="M110.104 19.7015C110.185 20.8809 109.993 22.0629 109.542 23.1556C109.091 24.2483 108.393 25.2221 107.504 26.0013C106.673 26.7738 105.698 27.3747 104.634 27.7694C103.57 28.1641 102.438 28.3448 101.304 28.3012C98.6534 28.2681 96.023 27.8297 93.5044 27.0012C90.6044 26.0013 90.3044 24.6013 90.3044 23.6014V22.9014C90.3263 22.0544 90.5675 21.2275 91.0044 20.5015C95.1044 22.3014 98.1044 23.1014 100.104 23.1014H100.604C103.304 22.9014 104.604 22.1014 104.604 20.5015C104.59 19.836 104.372 19.1911 103.978 18.6543C103.584 18.1176 103.035 17.7151 102.404 17.5016C101.274 16.9716 99.7344 16.3717 97.8044 15.7017C95.4044 14.9017 94.8044 14.5017 94.7044 14.3017H94.6044L94.5044 14.2018C93.6163 13.5741 92.9024 12.7307 92.4301 11.7511C91.9577 10.7715 91.7424 9.68776 91.8044 8.60198C91.7795 7.44415 91.9981 6.29399 92.446 5.22599C92.8939 4.158 93.5611 3.19598 94.4044 2.40224C96.0713 0.812125 98.3014 -0.0510881 100.604 0.00234036H100.804C103.271 0.00234036 106.371 0.835639 110.104 2.50224C109.951 3.21465 109.75 3.91615 109.504 4.60215C109.467 4.64166 109.438 4.68905 109.421 4.74092C109.403 4.79279 109.398 4.84785 109.404 4.90214C108.904 5.8021 108.404 6.60207 107.704 6.60207C107.532 6.61763 107.358 6.5829 107.204 6.50207C105.002 5.59333 102.677 5.0203 100.304 4.80214C99.8628 4.76557 99.4185 4.8273 99.0035 4.98291C98.5885 5.13852 98.2132 5.38414 97.9044 5.7021C97.6931 5.92912 97.5308 6.1972 97.4276 6.48965C97.3244 6.78211 97.2825 7.09268 97.3044 7.40203C97.3044 8.202 97.8044 9.40195 99.5044 10.3019C100.984 11.0851 102.522 11.7537 104.104 12.3018C105.234 12.6565 106.337 13.0909 107.404 13.6018C108.296 14.3403 109.004 15.2755 109.472 16.334C109.941 17.3925 110.157 18.5452 110.104 19.7015Z"
                    fill="#1E0B4B"></path>
                <path
                    d="M139.804 25.5013C139.778 25.9198 139.657 26.3267 139.449 26.6908C139.241 27.0549 138.952 27.3663 138.604 27.6012C138.349 27.879 138.041 28.102 137.697 28.2567C137.353 28.4114 136.981 28.4946 136.604 28.5011C136.463 28.5161 136.322 28.4807 136.204 28.4012C135.715 28.3167 135.248 28.1307 134.835 27.8551C134.422 27.5796 134.071 27.2206 133.804 26.8012L133.704 26.7012L125.404 17.5016L123.504 15.3017V25.5013C123.504 26.9012 123.104 28.2012 120.504 28.2012H117.104V1.00229H123.504V13.7018L125.404 11.6018L133.804 2.30223V2.20224C134.411 1.37828 135.302 0.808301 136.304 0.602305H136.604C136.975 0.591856 137.343 0.657453 137.687 0.795046C138.031 0.932639 138.343 1.1393 138.604 1.40227L138.804 1.60226L139.004 1.80225C139.391 2.30419 139.664 2.88424 139.804 3.50218C139.72 4.40358 139.332 5.24966 138.704 5.90209L131.804 13.7018L131.104 14.5017L131.704 15.2017L138.704 23.1014C139.037 23.4093 139.305 23.7798 139.494 24.1916C139.683 24.6034 139.788 25.0485 139.804 25.5013Z"
                    fill="#1E0B4B"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M200.304 25.5013C200.265 25.8916 200.148 26.2699 199.959 26.6136C199.77 26.9573 199.513 27.2592 199.204 27.5012C198.562 28.0537 197.751 28.3711 196.904 28.4012H196.704C195.697 28.2082 194.802 27.6354 194.204 26.8013L187.404 17.5016L185.404 14.7018V25.5013C185.404 26.9013 185.004 28.1012 182.304 28.2012H179.004V0.902332H192.004C192.996 0.885366 193.978 1.09236 194.879 1.50789C195.779 1.92342 196.574 2.53677 197.204 3.30223C198.522 4.75697 199.268 6.63968 199.304 8.60201C199.304 12.0019 198.004 14.3018 195.404 15.8017L194.404 16.4017L195.104 17.4016L199.004 22.8014L199.104 22.9014C199.812 23.5903 200.239 24.5163 200.304 25.5013ZM193.804 9.10199C193.804 6.30211 192.004 4.70218 189.004 4.70218H185.404V13.6018H189.004C192.004 13.6018 193.804 12.0019 193.804 9.10199Z"
                    fill="#1E0B4B"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M63.2044 23.7014C63.1404 23.8476 63.0443 23.9776 62.923 24.0814C62.8018 24.1853 62.6587 24.2605 62.5044 24.3013H62.1044C61.9649 24.3013 61.8275 24.267 61.7044 24.2014C61.5851 24.14 61.4793 24.0553 61.3934 23.9522C61.3075 23.8491 61.2432 23.7298 61.2044 23.6014C61.1432 23.4724 61.12 23.3285 61.1378 23.1868C61.1555 23.0451 61.2133 22.9114 61.3044 22.8014C61.3474 22.6598 61.4246 22.5309 61.5292 22.4263C61.6339 22.3216 61.7627 22.2444 61.9044 22.2014C62.1747 22.1911 62.4449 22.2249 62.7044 22.3014C62.9399 22.4379 63.1195 22.6534 63.211 22.9098C63.3026 23.1661 63.3002 23.4466 63.2044 23.7014ZM62.6044 22.6014C62.4813 22.5358 62.3439 22.5014 62.2044 22.5014H62.0044C61.8933 22.5183 61.7885 22.5642 61.7008 22.6344C61.613 22.7046 61.5453 22.7967 61.5044 22.9014C61.451 22.9931 61.4164 23.0945 61.4026 23.1997C61.3889 23.3049 61.3961 23.4118 61.4241 23.5142C61.452 23.6166 61.5 23.7124 61.5653 23.796C61.6306 23.8796 61.7119 23.9494 61.8044 24.0014C62.006 24.0689 62.2245 24.0661 62.4242 23.9935C62.624 23.9208 62.7933 23.7826 62.9044 23.6014C62.9544 23.517 62.9863 23.4231 62.9982 23.3258C63.0101 23.2284 63.0017 23.1296 62.9735 23.0357C62.9453 22.9417 62.8979 22.8546 62.8344 22.7799C62.7709 22.7051 62.6926 22.6444 62.6044 22.6014Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M62.3044 28.2012H62.0044V24.3013H62.3044V28.2012Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M121.204 22.1014C121.161 22.2431 121.084 22.3719 120.98 22.4766C120.875 22.5812 120.746 22.6584 120.604 22.7014H120.104C119.998 22.6917 119.895 22.6575 119.804 22.6014C119.685 22.5401 119.579 22.4553 119.493 22.3523C119.407 22.2492 119.343 22.1299 119.304 22.0014C119.243 21.8724 119.22 21.7286 119.238 21.5869C119.255 21.4452 119.313 21.3115 119.404 21.2015C119.504 21.0015 119.704 20.7015 120.004 20.7015C120.262 20.6011 120.547 20.6011 120.804 20.7015C120.926 20.7641 121.033 20.8508 121.119 20.9564C121.205 21.0619 121.269 21.184 121.307 21.3151C121.344 21.4462 121.354 21.5836 121.337 21.7188C121.319 21.8541 121.274 21.9843 121.204 22.1014ZM120.704 21.0015C120.587 20.9219 120.445 20.8865 120.304 20.9015H120.104C119.993 20.9184 119.889 20.9642 119.801 21.0345C119.713 21.1047 119.645 21.1968 119.604 21.3015C119.551 21.3932 119.516 21.4946 119.503 21.5998C119.489 21.705 119.496 21.8119 119.524 21.9143C119.552 22.0166 119.6 22.1124 119.665 22.1961C119.731 22.2797 119.812 22.3495 119.904 22.4014C120.093 22.4829 120.299 22.5172 120.504 22.5014C120.708 22.4217 120.882 22.2822 121.004 22.1014C121.058 22.0097 121.092 21.9083 121.106 21.8031C121.12 21.6979 121.113 21.591 121.085 21.4886C121.057 21.3863 121.009 21.2905 120.943 21.2068C120.878 21.1232 120.797 21.0534 120.704 21.0015Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M120.404 28.2012H120.204L120.104 22.8014H120.404V28.2012Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M183.104 22.1014C183.061 22.2431 182.984 22.3719 182.88 22.4766C182.775 22.5812 182.646 22.6584 182.504 22.7014H182.004C181.865 22.7014 181.728 22.6671 181.604 22.6014C181.485 22.5401 181.379 22.4553 181.293 22.3523C181.208 22.2492 181.143 22.1299 181.104 22.0014C181.043 21.8724 181.02 21.7286 181.038 21.5869C181.055 21.4452 181.113 21.3115 181.204 21.2015C181.304 21.0015 181.504 20.7015 181.804 20.7015C182.062 20.6011 182.347 20.6011 182.604 20.7015C182.834 20.8434 183.009 21.0594 183.1 21.3138C183.191 21.5682 183.192 21.846 183.104 22.1014ZM182.504 21.0015C182.381 20.9358 182.244 20.9015 182.104 20.9015H181.904C181.793 20.9184 181.689 20.9642 181.601 21.0345C181.513 21.1047 181.445 21.1968 181.404 21.3015C181.351 21.3932 181.316 21.4946 181.303 21.5998C181.289 21.705 181.296 21.8119 181.324 21.9143C181.352 22.0166 181.4 22.1124 181.465 22.1961C181.531 22.2797 181.612 22.3495 181.704 22.4014C181.893 22.4829 182.099 22.5172 182.304 22.5014C182.508 22.4217 182.682 22.2822 182.804 22.1014C182.858 22.0097 182.892 21.9083 182.906 21.8031C182.92 21.6979 182.913 21.591 182.885 21.4886C182.857 21.3863 182.809 21.2905 182.744 21.2068C182.678 21.1232 182.597 21.0534 182.504 21.0015Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M182.204 28.2012H182.004L181.904 22.8014H182.204V28.2012Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M96.8044 24.8013C96.8181 25.0155 96.766 25.2287 96.6549 25.4123C96.5438 25.5959 96.3791 25.741 96.183 25.8282C95.9869 25.9153 95.7688 25.9403 95.5581 25.8997C95.3473 25.8592 95.1541 25.755 95.0044 25.6013C94.8802 25.5081 94.7794 25.3874 94.7099 25.2485C94.6405 25.1097 94.6044 24.9566 94.6044 24.8013C94.6044 24.7013 94.7044 24.7013 94.7044 24.6013V24.5013C94.7117 24.4246 94.7473 24.3532 94.8044 24.3013C94.8847 24.2112 94.9521 24.1102 95.0044 24.0014C95.1106 23.9001 95.2363 23.8213 95.3737 23.7697C95.5112 23.7182 95.6577 23.6949 95.8044 23.7014C95.9358 23.6978 96.0664 23.7228 96.1873 23.7746C96.3081 23.8264 96.4163 23.9038 96.5044 24.0014C96.6397 24.0789 96.7437 24.2013 96.7984 24.3473C96.8532 24.4934 96.8553 24.6539 96.8044 24.8013ZM96.5044 25.0013C96.6044 25.0013 96.6044 24.9013 96.6044 24.8013C96.6077 24.6843 96.582 24.5683 96.5297 24.4637C96.4774 24.359 96.4 24.2689 96.3044 24.2013C96.1582 24.056 95.9605 23.9744 95.7544 23.9744C95.5483 23.9744 95.3505 24.056 95.2044 24.2013C95.0804 24.3775 95.0109 24.5861 95.0044 24.8013C95.0078 24.9868 95.0789 25.1646 95.2044 25.3013C95.2742 25.3944 95.3648 25.47 95.4689 25.5221C95.5731 25.5742 95.6879 25.6013 95.8044 25.6013C95.9208 25.6013 96.0356 25.5742 96.1398 25.5221C96.2439 25.47 96.3345 25.3944 96.4044 25.3013C96.4405 25.2607 96.4681 25.2132 96.4853 25.1616C96.5025 25.11 96.509 25.0555 96.5044 25.0013Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M94.8044 24.3013L94.7044 24.6013L90.3044 23.2014V22.9014L94.8044 24.3013Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.00438 24.6013C6.04322 24.7493 6.03523 24.9057 5.9815 25.0489C5.92778 25.1922 5.83096 25.3153 5.70438 25.4013C5.55465 25.555 5.36142 25.6591 5.15069 25.6997C4.93997 25.7403 4.72187 25.7153 4.52578 25.6281C4.32968 25.541 4.16499 25.3958 4.05389 25.2122C3.94279 25.0287 3.89062 24.8154 3.90439 24.6013V24.4013C3.97439 24.4013 4.00438 24.4013 4.00438 24.3013V24.2013C4.05668 24.0924 4.124 23.9915 4.20438 23.9013C4.29753 23.7771 4.41832 23.6763 4.55717 23.6069C4.69603 23.5375 4.84914 23.5013 5.00438 23.5013C5.15781 23.5106 5.30777 23.5509 5.44525 23.6196C5.58273 23.6883 5.70489 23.7842 5.80439 23.9013C5.91412 23.9764 5.99418 24.0874 6.0307 24.2152C6.06722 24.343 6.05791 24.4796 6.00438 24.6013ZM5.80439 24.9013V24.6013C5.79713 24.4863 5.76683 24.3739 5.7153 24.2709C5.66376 24.1678 5.59204 24.0761 5.50438 24.0013C5.35823 23.856 5.16049 23.7744 4.95438 23.7744C4.74827 23.7744 4.55054 23.856 4.40439 24.0013C4.32819 24.0799 4.27066 24.1747 4.23604 24.2785C4.20142 24.3824 4.19059 24.4927 4.20438 24.6013C4.22509 24.8138 4.29346 25.0189 4.40439 25.2013C4.57037 25.3468 4.78361 25.4271 5.00438 25.4271C5.22516 25.4271 5.4384 25.3468 5.60438 25.2013C5.68476 25.1111 5.75209 25.0102 5.80439 24.9013Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M4.00439 24.2013V24.5013L0.504395 23.4014V23.1014L4.00439 24.2013Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M107.904 4.10213V4.30212C107.878 4.30212 107.852 4.31266 107.834 4.33141C107.815 4.35016 107.804 4.3756 107.804 4.40212V4.50212C107.704 4.60211 107.704 4.70211 107.604 4.8021C107.511 4.92629 107.39 5.0271 107.252 5.09652C107.113 5.16595 106.96 5.20209 106.804 5.20209C106.556 5.14082 106.32 5.03949 106.104 4.9021C105.987 4.80261 105.891 4.68046 105.823 4.54298C105.754 4.40551 105.714 4.25555 105.704 4.10213C105.755 3.81962 105.857 3.54864 106.004 3.30217C106.207 3.11016 106.475 3.00313 106.754 3.00313C107.033 3.00313 107.302 3.11016 107.504 3.30217C107.629 3.39531 107.729 3.51609 107.799 3.65494C107.868 3.79379 107.904 3.94689 107.904 4.10213ZM107.604 4.00214C107.606 3.89906 107.579 3.79753 107.526 3.70912C107.473 3.62072 107.396 3.549 107.304 3.50216C107.158 3.35683 106.96 3.27525 106.754 3.27525C106.548 3.27525 106.35 3.35683 106.204 3.50216C106.152 3.61102 106.085 3.712 106.004 3.80214V4.10213C106.008 4.28761 106.079 4.46545 106.204 4.60211C106.37 4.74767 106.584 4.82792 106.804 4.82792C107.025 4.82792 107.238 4.74767 107.404 4.60211C107.53 4.42684 107.6 4.21771 107.604 4.00214Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M109.504 4.70217C109.504 4.80217 109.404 4.90216 109.404 5.00216L107.804 4.50218V4.20219L109.504 4.70217Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.1044 3.50217C17.0501 3.55611 17.015 3.62636 17.0044 3.70217V3.90216C16.9044 4.10215 16.8044 4.10215 16.7044 4.20214C16.63 4.32154 16.5271 4.42059 16.4049 4.49041C16.2827 4.56022 16.1451 4.5986 16.0044 4.60213C15.8578 4.60858 15.7113 4.58533 15.5738 4.53378C15.4363 4.48223 15.3107 4.40344 15.2044 4.30214C15.0117 4.0802 14.9055 3.79613 14.9055 3.50217C14.9055 3.20821 15.0117 2.92414 15.2044 2.70221C15.4069 2.5102 15.6754 2.40317 15.9544 2.40317C16.2335 2.40317 16.5019 2.5102 16.7044 2.70221C16.8964 2.93525 17.0332 3.20874 17.1044 3.50217ZM16.8044 3.40218C16.8063 3.2991 16.7792 3.19756 16.7261 3.10916C16.6731 3.02076 16.5963 2.94904 16.5044 2.9022C16.3583 2.75687 16.1605 2.67529 15.9544 2.67529C15.7483 2.67529 15.5506 2.75687 15.4044 2.9022C15.3521 3.01106 15.2848 3.11205 15.2044 3.20219V3.50217C15.2251 3.71466 15.2935 3.91973 15.4044 4.10215C15.5728 4.21008 15.7724 4.25884 15.9716 4.24073C16.1708 4.22262 16.3583 4.13868 16.5044 4.00215C16.6028 3.93733 16.6823 3.84774 16.7349 3.74241C16.7876 3.63708 16.8116 3.51973 16.8044 3.40218Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M19.8044 4.50211C19.7501 4.55605 19.715 4.6263 19.7044 4.70211L16.9044 3.90214L17.0044 3.70215L19.8044 4.50211Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M81.2044 6.70208C81.0865 6.97011 80.8724 7.18419 80.6044 7.30206C80.3009 7.31832 79.9968 7.28454 79.7044 7.20206C79.4587 7.05045 79.2804 6.81057 79.206 6.53165C79.1316 6.25273 79.1668 5.95592 79.3044 5.70213C79.3657 5.5828 79.4504 5.47703 79.5535 5.39114C79.6566 5.30524 79.7759 5.24097 79.9044 5.20215H80.4044C80.4585 5.19755 80.5131 5.20404 80.5647 5.22124C80.6162 5.23843 80.6638 5.26596 80.7044 5.30214C80.846 5.3451 80.9748 5.42233 81.0795 5.52698C81.1842 5.63164 81.2614 5.76049 81.3044 5.90212C81.3705 6.172 81.3349 6.45679 81.2044 6.70208ZM80.6044 5.50213C80.5197 5.43857 80.421 5.3963 80.3166 5.3789C80.2121 5.36149 80.1051 5.36946 80.0044 5.40214C79.8932 5.41903 79.7885 5.46489 79.7007 5.53511C79.613 5.60532 79.5452 5.69741 79.5044 5.80212C79.451 5.89383 79.4164 5.99524 79.4026 6.10045C79.3888 6.20565 79.3961 6.31255 79.424 6.41491C79.4519 6.51728 79.4999 6.61307 79.5652 6.69671C79.6305 6.78034 79.7118 6.85015 79.8044 6.90208C79.9275 6.96773 80.0648 7.00207 80.2044 7.00207H80.4044C80.5155 6.98518 80.6202 6.93932 80.708 6.8691C80.7957 6.79888 80.8635 6.70679 80.9044 6.60209C80.9577 6.51037 80.9923 6.40897 81.0061 6.30376C81.0199 6.19856 81.0126 6.09166 80.9847 5.98929C80.9568 5.88693 80.9088 5.79114 80.8435 5.7075C80.7782 5.62386 80.6969 5.55405 80.6044 5.50213Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M80.4044 5.10214V5.20214H80.1044V0.902313H80.3044L80.4044 5.10214Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M49.2044 21.5014C49.2184 21.634 49.1982 21.768 49.1457 21.8905C49.0931 22.0131 49.0101 22.1201 48.9044 22.2014L48.7044 22.4014H48.6044C48.6044 22.5014 48.5044 22.5014 48.4044 22.5014H48.1044C47.809 22.5089 47.5221 22.4013 47.3044 22.2014C47.2031 22.0951 47.1243 21.9695 47.0728 21.832C47.0212 21.6946 46.998 21.5481 47.0044 21.4014C46.9904 21.2689 47.0107 21.1349 47.0632 21.0124C47.1157 20.8898 47.1988 20.7828 47.3044 20.7015C47.5308 20.5162 47.812 20.4108 48.1044 20.4015C48.3954 20.4041 48.6736 20.5208 48.8794 20.7265C49.0851 20.9323 49.2018 21.2105 49.2044 21.5014ZM48.9044 21.5014C48.9155 21.3889 48.9031 21.2753 48.8682 21.1677C48.8332 21.0602 48.7764 20.9611 48.7012 20.8765C48.6261 20.792 48.5343 20.7239 48.4316 20.6766C48.3289 20.6293 48.2175 20.6037 48.1044 20.6015C47.9644 20.5973 47.826 20.6319 47.7044 20.7015C47.666 20.7035 47.6284 20.7134 47.594 20.7306C47.5596 20.7478 47.5291 20.772 47.5044 20.8015C47.3935 20.9839 47.3251 21.189 47.3044 21.4014C47.3132 21.5596 47.3659 21.7121 47.4567 21.8418C47.5475 21.9715 47.6727 22.0733 47.8183 22.1357C47.9639 22.1981 48.1239 22.2186 48.2805 22.1948C48.4371 22.1711 48.5839 22.1041 48.7044 22.0014C48.8299 21.8648 48.901 21.6869 48.9044 21.5014Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M51.6044 28.2012H51.3044L48.4044 22.5014L48.7044 22.4014L51.6044 28.2012Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M169.504 22.5014C169.512 22.7969 169.404 23.0837 169.204 23.3014C169.104 23.3014 169.104 23.4014 169.004 23.4014C168.904 23.4014 169.004 23.5014 168.904 23.5014L168.804 23.6014H168.404C168.109 23.6088 167.822 23.5013 167.604 23.3014C167.419 23.075 167.314 22.7938 167.304 22.5014C167.286 22.3571 167.315 22.2108 167.387 22.0845C167.46 21.9582 167.571 21.8589 167.704 21.8014C167.889 21.613 168.141 21.5052 168.404 21.5014C168.68 21.5003 168.945 21.6024 169.149 21.7875C169.353 21.9726 169.479 22.2273 169.504 22.5014ZM169.204 22.6014C169.214 22.494 169.199 22.386 169.162 22.2848C169.125 22.1836 169.067 22.0917 168.99 22.0155C168.914 21.9393 168.822 21.8807 168.721 21.8437C168.62 21.8067 168.512 21.7923 168.404 21.8014H168.104C168.004 21.9014 167.904 21.9014 167.904 22.0014C167.813 22.0483 167.736 22.12 167.683 22.2084C167.63 22.2968 167.603 22.3983 167.604 22.5014C167.613 22.6595 167.666 22.812 167.757 22.9418C167.848 23.0715 167.973 23.1733 168.118 23.2357C168.264 23.2981 168.424 23.3185 168.58 23.2948C168.737 23.2711 168.884 23.2041 169.004 23.1014C169.13 22.9647 169.201 22.7869 169.204 22.6014Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M171.404 28.2012H171.004L168.704 23.6013L169.004 23.4014V23.5013L171.404 28.2012Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M137.604 4.60215C137.504 4.90214 137.304 5.00214 137.004 5.20213C136.734 5.21247 136.464 5.1787 136.204 5.10213C136.085 5.04078 135.979 4.95605 135.893 4.85297C135.807 4.7499 135.743 4.63059 135.704 4.50216C135.627 4.23543 135.644 3.95009 135.754 3.69479C135.863 3.4395 136.058 3.23007 136.304 3.10221C136.575 3.08089 136.847 3.11492 137.104 3.20221C137.204 3.20221 137.204 3.20221 137.304 3.3022C137.331 3.3022 137.356 3.31274 137.375 3.33149C137.394 3.35025 137.404 3.37568 137.404 3.4022C137.474 3.4022 137.504 3.4022 137.504 3.5022C137.585 3.59234 137.652 3.69332 137.704 3.80218C137.762 3.93199 137.783 4.0751 137.766 4.21609C137.748 4.35707 137.692 4.49056 137.604 4.60215ZM137.404 3.90218C137.329 3.69619 137.189 3.52052 137.004 3.4022C136.912 3.35317 136.809 3.32754 136.704 3.32754C136.6 3.32754 136.497 3.35317 136.404 3.4022C136.211 3.47663 136.053 3.62041 135.961 3.80537C135.868 3.99033 135.848 4.20316 135.904 4.40216L136.104 4.80214C136.129 4.83166 136.16 4.85577 136.194 4.87297C136.228 4.89018 136.266 4.90011 136.304 4.90214C136.41 4.96667 136.531 5.00082 136.654 5.00082C136.778 5.00082 136.899 4.96667 137.004 4.90214C137.102 4.87053 137.192 4.81775 137.267 4.74756C137.342 4.67738 137.401 4.5915 137.439 4.49604C137.477 4.40058 137.494 4.29788 137.488 4.19524C137.482 4.0926 137.453 3.99254 137.404 3.90218Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M139.004 1.80225L137.504 3.50219L137.304 3.30219L138.804 1.60226L139.004 1.80225Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M32.1044 19.7015C32.0044 19.6015 31.9044 19.5015 32.0044 19.4015L38.7044 6.40208C38.7175 6.38878 38.733 6.37821 38.7502 6.37099C38.7674 6.36378 38.7858 6.36006 38.8044 6.36006C38.8231 6.36006 38.8415 6.36378 38.8587 6.37099C38.8758 6.37821 38.8914 6.38878 38.9044 6.40208C39.0044 6.40208 39.1044 6.50208 39.0044 6.60207L32.3044 19.6015C32.2798 19.631 32.2493 19.6552 32.2149 19.6724C32.1804 19.6896 32.1429 19.6995 32.1044 19.7015Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M78.4044 23.7013C78.3778 23.7013 78.3524 23.6908 78.3336 23.672C78.3149 23.6533 78.3044 23.6279 78.3044 23.6013L69.2044 12.2018C69.1044 12.2018 69.2044 12.0018 69.2044 12.0018C69.2221 11.979 69.2449 11.9605 69.2709 11.9478C69.2969 11.935 69.3254 11.9284 69.3544 11.9284C69.3833 11.9284 69.4119 11.935 69.4378 11.9478C69.4638 11.9605 69.4866 11.979 69.5044 12.0018L78.6044 23.4013C78.6109 23.4556 78.6053 23.5107 78.588 23.5626C78.5707 23.6144 78.5422 23.6618 78.5044 23.7013H78.4044Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M150.604 22.7014H150.504C150.467 22.6619 150.438 22.6145 150.421 22.5626C150.403 22.5107 150.398 22.4557 150.404 22.4014L157.104 9.50192C157.144 9.46412 157.191 9.43555 157.243 9.41826C157.295 9.40097 157.35 9.39539 157.404 9.40193C157.504 9.40193 157.504 9.50192 157.504 9.60192L150.704 22.6014C150.704 22.6714 150.704 22.7014 150.604 22.7014Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M135.804 25.3013L135.704 25.2013L130.304 18.9016C130.304 18.9016 130.304 18.7016 130.404 18.7016C130.504 18.7016 130.604 18.6016 130.604 18.7016L136.004 25.0013C136.104 25.0013 136.104 25.2013 135.904 25.2013C135.904 25.2278 135.894 25.2532 135.875 25.272C135.856 25.2908 135.831 25.3013 135.804 25.3013Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M196.204 24.1014C196.166 24.0993 196.128 24.0894 196.094 24.0722C196.06 24.055 196.029 24.0309 196.004 24.0014L191.104 17.4016C191.104 17.3017 191.104 17.2017 191.204 17.2017C191.304 17.2017 191.404 17.1017 191.404 17.2017L196.304 23.8014C196.327 23.8191 196.346 23.8419 196.358 23.8679C196.371 23.8939 196.378 23.9224 196.378 23.9514C196.378 23.9803 196.371 24.0089 196.358 24.0349C196.346 24.0609 196.327 24.0836 196.304 24.1014H196.204Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.25"
                    stroke-miterlimit="10"></path>
                <path
                    d="M6.10444 55.5001C6.19252 55.5977 6.30071 55.675 6.42155 55.7268C6.54239 55.7786 6.67302 55.8036 6.80445 55.8C6.93704 55.814 7.071 55.7938 7.19354 55.7413C7.31609 55.6888 7.42313 55.6057 7.50444 55.5001C7.69286 55.3154 7.80069 55.0638 7.80445 54.8001V42.6006C7.77962 42.3449 7.81171 42.0869 7.89842 41.8451C7.98512 41.6034 8.1243 41.3838 8.30593 41.2021C8.48757 41.0205 8.70717 40.8813 8.94897 40.7946C9.19077 40.7079 9.44877 40.6758 9.70444 40.7007H12.8044C13.1044 40.7007 13.3044 40.5007 13.4044 40.5007C13.5567 40.3008 13.6281 40.0509 13.6044 39.8007C13.6044 39.4007 13.5044 39.3007 13.4044 39.2007C13.2376 39.0594 13.0227 38.9877 12.8044 39.0007H0.804445C0.586165 38.9877 0.371268 39.0594 0.204439 39.2007C0.133042 39.2825 0.0786 39.3777 0.0442675 39.4807C0.00993501 39.5837 -0.00360146 39.6924 0.00444206 39.8007C-0.0192108 40.0509 0.0521889 40.3008 0.204439 40.5007C0.371268 40.642 0.586165 40.7137 0.804445 40.7007H3.90444C4.15943 40.6856 4.41483 40.7222 4.65537 40.8081C4.89592 40.894 5.11668 41.0275 5.30445 41.2006C5.63306 41.5926 5.81043 42.0892 5.80445 42.6006V54.8001C5.80092 54.9315 5.82591 55.0621 5.8777 55.183C5.92948 55.3038 6.00684 55.412 6.10444 55.5001Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M18.3044 38.9007C18.1803 38.872 18.051 38.8753 17.9286 38.9103C17.8062 38.9453 17.6947 39.011 17.6047 39.101C17.5146 39.191 17.449 39.3025 17.414 39.4249C17.3789 39.5473 17.3756 39.6767 17.4044 39.8007V39.7007C17.3895 39.5921 17.3999 39.4816 17.4348 39.3778C17.4698 39.2739 17.5283 39.1795 17.6057 39.1021C17.6832 39.0246 17.7776 38.9661 17.8814 38.9312C17.9853 38.8962 18.0958 38.8858 18.2044 38.9007H18.3044Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M18.2044 55.8C18.0869 55.8072 17.9695 55.7832 17.8642 55.7305C17.7588 55.6778 17.6692 55.5983 17.6044 55.5C17.4744 55.43 17.4044 55.27 17.4044 55C17.3957 55.0933 17.4093 55.1872 17.4441 55.2742C17.4788 55.3611 17.5338 55.4385 17.6044 55.5C17.6789 55.5881 17.7704 55.6601 17.8736 55.7117C17.9767 55.7633 18.0893 55.7933 18.2044 55.8Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M27.9044 54.8001C27.9193 54.6915 27.9089 54.581 27.8739 54.4771C27.839 54.3733 27.7805 54.2789 27.703 54.2014C27.6255 54.124 27.5312 54.0655 27.4273 54.0305C27.3235 53.9956 27.2129 53.9852 27.1044 54.0001C27.2126 53.992 27.3214 54.0056 27.4244 54.0399C27.5274 54.0742 27.6226 54.1287 27.7044 54.2001C27.83 54.3753 27.8997 54.5845 27.9044 54.8001Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M27.9044 54.8001V54.9001C27.9124 55.0083 27.8989 55.1171 27.8645 55.2201C27.8302 55.3231 27.7758 55.4182 27.7044 55.5C27.6395 55.5984 27.55 55.6779 27.4446 55.7305C27.3393 55.7832 27.2219 55.8072 27.1044 55.8C27.2195 55.7933 27.3321 55.7633 27.4352 55.7117C27.5384 55.6601 27.6299 55.5881 27.7044 55.5C27.8566 55.3001 27.928 55.0502 27.9044 54.8001Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M43.7043 39.5007C43.1137 39.1647 42.4718 38.9282 41.8044 38.8007C41.1902 38.6038 40.5493 38.5026 39.9043 38.5007C38.5941 38.4835 37.2964 38.7567 36.1043 39.3007C35.0868 39.792 34.1708 40.4704 33.4043 41.3006C32.6531 42.1086 32.0747 43.0613 31.7043 44.1005C31.0375 46.2158 31.0375 48.485 31.7043 50.6002C32.0853 51.6344 32.6625 52.5851 33.4043 53.4001C34.1708 54.2303 35.0868 54.9088 36.1043 55.4C37.3045 55.9088 38.6017 56.1478 39.9043 56.1C40.6424 56.1039 41.3791 56.0369 42.1043 55.9C42.6971 55.7358 43.2678 55.5008 43.8044 55.2C43.9889 55.0817 44.1294 54.9061 44.2043 54.7001C44.1951 54.4077 44.0896 54.1265 43.9043 53.9001C43.825 53.7623 43.7068 53.6508 43.5646 53.5797C43.4223 53.5086 43.2622 53.4809 43.1043 53.5001C42.8577 53.5053 42.6165 53.5742 42.4043 53.7001C42.0487 53.8367 41.6801 53.9372 41.3044 54.0001C40.8414 54.073 40.373 54.1064 39.9043 54.1001C38.5985 54.1468 37.3089 53.7983 36.2043 53.1001C35.2932 52.442 34.5413 51.5877 34.0043 50.6002C33.5429 49.5613 33.3045 48.4372 33.3045 47.3004C33.3045 46.1636 33.5429 45.0394 34.0043 44.0005C34.4921 42.9796 35.2537 42.1141 36.2043 41.5006C37.297 40.766 38.5878 40.3823 39.9043 40.4007C40.3455 40.3981 40.7843 40.4656 41.2043 40.6007C41.627 40.6528 42.0349 40.7888 42.4043 41.0006C42.6299 41.0753 42.8669 41.1091 43.1043 41.1006C43.2622 41.1199 43.4223 41.0922 43.5646 41.0211C43.7068 40.9499 43.825 40.8385 43.9043 40.7006C44.2043 40.4007 44.2043 40.1007 44.1043 40.0007C44.0875 39.8896 44.0416 39.7848 43.9714 39.6971C43.9012 39.6093 43.8091 39.5416 43.7043 39.5007Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M61.3044 55.5C61.4073 55.606 61.5324 55.6879 61.6707 55.7398C61.8091 55.7916 61.9572 55.8122 62.1044 55.8C62.3664 55.7883 62.6152 55.6817 62.8044 55.5C62.939 55.2917 63.0086 55.0481 63.0044 54.8001V39.9007C63.0086 39.6527 62.939 39.409 62.8044 39.2007C62.5867 39.0008 62.2999 38.8932 62.0044 38.9007C61.873 38.8972 61.7423 38.9222 61.6215 38.974C61.5007 39.0258 61.3925 39.1031 61.3044 39.2007C61.116 39.3853 61.0081 39.6369 61.0044 39.9007V44.5005C61.0104 45.0119 60.833 45.5085 60.5044 45.9004C60.08 46.2407 59.548 46.418 59.0044 46.4004H53.4044C52.8608 46.418 52.3287 46.2407 51.9044 45.9004C51.7142 45.7204 51.5628 45.5032 51.4596 45.2625C51.3564 45.0217 51.3036 44.7624 51.3044 44.5005V39.9007C51.3087 39.6527 51.239 39.409 51.1044 39.2007C51.0015 39.0947 50.8764 39.0128 50.738 38.961C50.5997 38.9091 50.4516 38.8885 50.3044 38.9007C50.0406 38.9045 49.789 39.0123 49.6044 39.2007C49.4697 39.409 49.4001 39.6527 49.4044 39.9007V54.8001C49.3756 54.9241 49.3789 55.0534 49.414 55.1758C49.449 55.2982 49.5146 55.4097 49.6047 55.4997C49.6947 55.5898 49.8062 55.6554 49.9286 55.6904C50.051 55.7255 50.1803 55.7288 50.3044 55.7H50.4044C50.5284 55.7288 50.6578 55.7255 50.7802 55.6904C50.9026 55.6554 51.0141 55.5898 51.1041 55.4997C51.1941 55.4097 51.2598 55.2982 51.2948 55.1758C51.3298 55.0534 51.3331 54.9241 51.3044 54.8001V48.2003H59.0044C59.276 48.162 59.5528 48.1873 59.8129 48.2743C60.073 48.3612 60.3094 48.5074 60.5033 48.7014C60.6973 48.8953 60.8435 49.1317 60.9305 49.3918C61.0174 49.6519 61.0427 49.9287 61.0044 50.2002V54.7001C61.1044 55.1 61.1044 55.3 61.3044 55.5Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M81.5044 55.7C81.5309 55.7 81.5563 55.6895 81.5751 55.6707C81.5938 55.652 81.6044 55.6265 81.6044 55.6V39.9007C81.6006 39.6369 81.4928 39.3853 81.3044 39.2007C81.2163 39.1031 81.1081 39.0257 80.9873 38.974C80.8664 38.9222 80.7358 38.8972 80.6044 38.9007C80.4718 38.8867 80.3378 38.907 80.2153 38.9595C80.0927 39.012 79.9857 39.095 79.9044 39.2007C79.716 39.3853 79.6081 39.6369 79.6044 39.9007V48.2003C79.6044 49.4003 79.0044 49.5003 78.7044 49.5003C78.5129 49.4873 78.3259 49.4364 78.1542 49.3505C77.9826 49.2647 77.8297 49.1457 77.7044 49.0003L68.5044 39.1007C68.4025 38.9841 68.2588 38.9123 68.1044 38.9007V54.8001C68.0692 54.9238 68.0692 55.0549 68.1046 55.1786C68.1399 55.3022 68.2091 55.4136 68.3044 55.5C68.4073 55.606 68.5324 55.6879 68.6707 55.7398C68.8091 55.7916 68.9572 55.8122 69.1044 55.8C69.3682 55.7963 69.6197 55.6884 69.8044 55.5C69.939 55.2917 70.0086 55.0481 70.0044 54.8001V43.6005L71.0044 44.6005L81.3044 55.7H81.4044C81.5044 55.8 81.5044 55.7 81.5044 55.7Z"
                    fill="#2A2A2D"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M102.804 43.5005C103.299 44.7048 103.537 45.9989 103.504 47.3004C103.542 48.6347 103.304 49.9624 102.804 51.2002C102.341 52.2634 101.66 53.2173 100.804 54.0001C100.018 54.7052 99.1006 55.2488 98.1044 55.6C97.0827 55.9916 95.9986 56.1949 94.9044 56.2C93.7777 56.1952 92.6607 55.9921 91.6044 55.6C90.6009 55.2648 89.6804 54.7193 88.9044 54.0001C88.0204 53.243 87.3339 52.282 86.9044 51.2002C85.9713 48.7184 85.9713 45.9823 86.9044 43.5005C87.3339 42.4187 88.0204 41.4578 88.9044 40.7006C89.6857 39.9643 90.6027 39.387 91.6044 39.0007C92.6731 38.6693 93.7856 38.5007 94.9044 38.5007C95.9883 38.5277 97.064 38.6958 98.1044 39.0007C99.0998 39.3995 100.015 39.9755 100.804 40.7006C101.688 41.4578 102.375 42.4187 102.804 43.5005ZM101.604 47.3004C101.691 46.2744 101.519 45.2431 101.104 44.3005C100.663 43.5353 100.125 42.8296 99.5044 42.2006C98.8558 41.6378 98.1103 41.1973 97.3044 40.9006C96.4895 40.6703 95.6505 40.5361 94.8044 40.5006C93.9879 40.5017 93.1771 40.6369 92.4044 40.9006C91.575 41.1458 90.8192 41.5924 90.2044 42.2006C89.563 42.8112 89.0229 43.52 88.6044 44.3005C88.2003 45.2461 88.0288 46.2748 88.1044 47.3004C88.0182 48.3264 88.19 49.3577 88.6044 50.3002C89.0101 51.0889 89.5517 51.7997 90.2044 52.4002C90.8379 52.9837 91.5877 53.4267 92.4044 53.7001C93.1713 53.9864 93.9862 54.1222 94.8044 54.1001C95.6541 54.1047 96.4987 53.9696 97.3044 53.7001C98.1338 53.455 98.8896 53.0084 99.5044 52.4002C100.157 51.7997 100.699 51.0889 101.104 50.3002C101.519 49.3577 101.691 48.3264 101.604 47.3004Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M93.7043 48.5003C93.398 48.174 93.2204 47.7477 93.2043 47.3004C93.2092 47.0928 93.256 46.8884 93.342 46.6993C93.4279 46.5103 93.5511 46.3406 93.7043 46.2004V46.1004C94.0407 45.8099 94.4612 45.6346 94.9043 45.6005C95.322 45.618 95.7165 45.7973 96.0043 46.1004C96.1792 46.2504 96.3224 46.4338 96.4254 46.6399C96.5284 46.8459 96.5893 47.0705 96.6044 47.3004C96.6044 47.5333 96.5501 47.7629 96.446 47.9712C96.3418 48.1795 96.1906 48.3606 96.0043 48.5003C95.7165 48.8035 95.322 48.9828 94.9043 49.0003C94.6793 49.0153 94.4538 48.978 94.2456 48.8913C94.0374 48.8045 93.8522 48.6707 93.7043 48.5003Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M108.104 54.9C108.104 55.3 108.204 55.4 108.304 55.5C108.404 55.6 108.604 55.8 109.004 55.8H117.804C117.919 55.7933 118.032 55.7633 118.135 55.7117C118.238 55.6601 118.33 55.5881 118.404 55.5C118.476 55.4182 118.53 55.3231 118.565 55.2201C118.599 55.1171 118.612 55.0083 118.604 54.9C118.628 54.6499 118.557 54.4 118.404 54.2001C118.238 54.0587 118.023 53.9871 117.804 54.0001H110.104V39.9007C110.101 39.6369 109.993 39.3853 109.804 39.2007C109.716 39.1031 109.608 39.0257 109.487 38.974C109.366 38.9222 109.236 38.8972 109.104 38.9007C108.972 38.8867 108.838 38.907 108.715 38.9595C108.593 39.012 108.486 39.095 108.404 39.2007C108.216 39.3853 108.108 39.6369 108.104 39.9007V54.9Z"
                    fill="#2A2A2D"></path>
                <path
                    d="M19.4044 40.7006V46.4004H27.1044C27.222 46.3933 27.3393 46.4172 27.4447 46.4699C27.55 46.5226 27.6396 46.6021 27.7044 46.7004C27.7696 46.7661 27.8209 46.8442 27.8552 46.9301C27.8896 47.016 27.9063 47.1079 27.9044 47.2004V47.4004C27.9125 47.5086 27.8989 47.6174 27.8646 47.7204C27.8303 47.8234 27.7758 47.9185 27.7044 48.0003C27.5291 48.1259 27.32 48.1956 27.1044 48.2003H19.4044V54.0001H27.1044C27.213 53.9852 27.3235 53.9956 27.4274 54.0305C27.5312 54.0655 27.6256 54.124 27.7031 54.2014C27.7805 54.2789 27.839 54.3733 27.874 54.4771C27.9089 54.581 27.9193 54.6915 27.9044 54.8001C27.9281 55.0502 27.8567 55.3001 27.7044 55.5C27.5376 55.6414 27.3227 55.713 27.1044 55.7H18.3044C18.0542 55.7237 17.8043 55.6523 17.6044 55.5C17.6044 55.4 17.5044 55.3 17.4044 55V39.9007C17.4082 39.6369 17.516 39.3853 17.7044 39.2007C17.7857 39.095 17.8928 39.012 18.0153 38.9595C18.1379 38.907 18.2718 38.8867 18.4044 38.9007H27.1044C27.2127 38.8927 27.3215 38.9062 27.4245 38.9405C27.5275 38.9749 27.6226 39.0293 27.7044 39.1007C27.8153 39.2831 27.8837 39.4882 27.9044 39.7007V39.9007C27.9193 40.0092 27.9089 40.1198 27.874 40.2236C27.839 40.3275 27.7805 40.4218 27.7031 40.4993C27.6256 40.5768 27.5312 40.6353 27.4274 40.6702C27.3235 40.7051 27.213 40.7155 27.1044 40.7006H19.4044Z"
                    fill="#2A2A2D"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M152.404 42.9006C152.403 43.5783 152.302 44.2521 152.104 44.9005C151.914 45.3334 151.86 45.8139 151.949 46.2783C152.039 46.7427 152.267 47.169 152.604 47.5004C153.018 47.9229 153.326 48.4367 153.504 49.0003C153.765 49.5648 153.901 50.1786 153.904 50.8002C153.916 51.4235 153.779 52.0405 153.504 52.6002C153.304 53.1838 152.999 53.726 152.604 54.2001C152.134 54.6512 151.594 55.0227 151.004 55.3C150.31 55.5948 149.558 55.7314 148.804 55.7H143.304C142.87 55.7136 142.444 55.5718 142.104 55.3C141.959 55.138 141.849 54.948 141.78 54.7416C141.711 54.5352 141.685 54.3168 141.704 54.1001V40.5007C141.691 40.0658 141.833 39.6404 142.104 39.3007C142.266 39.1555 142.457 39.0451 142.663 38.9763C142.869 38.9075 143.088 38.8818 143.304 38.9007H147.304C148.241 38.8629 149.172 39.0697 150.004 39.5007C150.694 39.7948 151.284 40.2808 151.704 40.9006C152.101 41.4983 152.342 42.1859 152.404 42.9006ZM151.804 50.8002C151.802 50.2856 151.7 49.7763 151.504 49.3003C151.292 48.8133 150.945 48.397 150.504 48.1003C150.008 47.7592 149.401 47.6165 148.804 47.7004H145.904C145.772 47.7143 145.638 47.6941 145.515 47.6416C145.393 47.5891 145.286 47.506 145.204 47.4004C145.063 47.2336 144.991 47.0187 145.004 46.8004C145.004 46.4004 145.104 46.3004 145.204 46.2004C145.304 46.1004 145.604 46.0004 145.904 45.9004C146.504 45.9004 148.304 46.0004 149.204 45.4005C149.594 45.2065 149.91 44.8905 150.104 44.5005C150.298 44.0943 150.401 43.6506 150.404 43.2005C150.317 42.7544 150.183 42.3187 150.004 41.9006C149.696 41.5359 149.323 41.2309 148.904 41.0006C148.399 40.7865 147.853 40.6842 147.304 40.7006H145.704C145.43 40.6711 145.152 40.7018 144.891 40.7904C144.63 40.879 144.391 41.0235 144.191 41.2139C143.991 41.4042 143.835 41.6358 143.734 41.8926C143.632 42.1493 143.588 42.425 143.604 42.7006V51.9002C143.598 52.1778 143.647 52.454 143.75 52.7118C143.853 52.9697 144.008 53.2039 144.204 53.4003C144.401 53.5967 144.635 53.7511 144.893 53.8542C145.151 53.9573 145.427 54.007 145.704 54.0001H148.804C149.406 53.9881 149.993 53.8154 150.504 53.5001C150.908 53.1641 151.247 52.7575 151.504 52.3002C151.653 51.8111 151.753 51.3087 151.804 50.8002Z"
                    fill="#2A2A2D"></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M136.904 55.2V55.3C136.904 55.3266 136.894 55.352 136.875 55.3707C136.856 55.3895 136.831 55.4 136.804 55.4V55.5H136.704C136.614 55.6472 136.471 55.7544 136.304 55.8H135.704C135.65 55.8066 135.595 55.801 135.543 55.7837C135.491 55.7664 135.444 55.7378 135.404 55.7C135.274 55.63 135.204 55.57 135.204 55.5L134.204 53.3001H125.004L124.004 55.5C123.914 55.5804 123.813 55.6477 123.704 55.7C123.704 55.8 123.604 55.8 123.504 55.8H122.804C122.625 55.7228 122.457 55.6219 122.304 55.5V54.9001C122.324 54.7182 122.393 54.5453 122.504 54.4001L125.004 48.9003L128.704 40.8006V40.7006L128.904 40.5007V40.4007L129.004 40.3007C129.046 40.1863 129.115 40.0834 129.204 40.0007L129.304 39.9007V39.8007H129.404L129.504 39.7007H129.704C129.804 39.7007 129.804 39.7007 129.904 39.8007H130.004C130.104 39.9007 130.104 40.1007 130.304 40.2007C130.304 40.3007 130.304 40.3007 130.404 40.4007V40.5007C130.461 40.5526 130.497 40.6239 130.504 40.7006L133.604 47.4004L136.804 54.4001C136.904 54.6001 136.904 54.8001 137.004 54.9001C137.011 54.9543 137.005 55.0094 136.988 55.0613C136.971 55.1131 136.942 55.1605 136.904 55.2ZM125.904 51.5002H133.504L130.904 45.8004C130.821 45.5817 130.687 45.3859 130.513 45.2293C130.34 45.0728 130.131 44.9601 129.904 44.9005H129.704C129.565 44.9005 129.428 44.9348 129.304 45.0005C128.974 45.0705 128.704 45.3705 128.504 45.9004L125.904 51.5002Z"
                    fill="#2A2A2D"></path>
            </svg> -->
    </a>

    <div class="lg:hidden flex-none bg-[#3E96F4] inline-block px-3 md:py-2 pb-1 whitespace-nowrap rounded-md text-white font-semibold font-inter mr-2 astro-5KNYCIEN">
          <a href="/contact-us" class="text-xs md:text-base astro-5KNYCIEN">Inquire Now</a>
  </div>

    <div class="block xl:hidden w-1/12 md:w-auto flex-none astro-5KNYCIEN">
      <button class="flex flex-col justify-center items-center px-2 py-2 text-[9px] rounded hover:text-black hover:border-white menu astro-5KNYCIEN" id="open-menu">
        <svg class="fill-current h-5 w- astro-5KNYCIEN" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" class="astro-5KNYCIEN"></path></svg>MENU
      </button>
      
      <button class="hidden flex flex-col justify-center items-center px-2 py-2 text-[9px] rounded hover:text-black hover:border-white menu astro-5KNYCIEN" id="close-menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-5KNYCIEN">
        <circle cx="12" cy="12" r="12" fill="#3E96F4" class="astro-5KNYCIEN"></circle>
        <path d="M8 16L16 8" stroke="white" stroke-width="2" class="astro-5KNYCIEN"></path>
        <path d="M16 16L8 8" stroke="white" stroke-width="2" class="astro-5KNYCIEN"></path>
        </svg>
      </button>

    </div>
    

    <div class="w-full hidden xl:flex xl:items-center xl:w-auto pb-0 md:pb-4 lg:pb-0 font-semibold text-base astro-5KNYCIEN" id="menu">
      <ul class="!leading-8 lg:flex-grow astro-5KNYCIEN" id="main-menu">
        <!-- <li class="block mt-5 xl:inline-block xl:mt-0 mr-8 text-[#31393C]"> -->
          <!-- <span class="group relative inline-block"> -->
            <!-- <span class="flex gap-1"><a href="#" class="text-sm md:text-base">Solutions</a><Image src={down_arrow} alt="Down Arrow" /></span> -->
            <!-- <a href="#" class="text-sm md:text-base">Solutions</a> -->
            <!-- <ul
              class="sub-menu w-[100%] md:w-auto lg:absolute z-10 hidden submenu-bg lg:top-[4.1rem] py-2 pr-[2.75rem] lg:-left-[1.5rem] left-[5rem] top-[0.75rem] md:group-hover:block overflow-x-hidden"
            >
              <li class="">
                <a
                  class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base"
                  href="#">ERPNext</a
                >
              </li>
              <li class="">
                <a
                  class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base"
                  href="#">Service Now</a
                >
              </li>
            </ul> -->
          <!-- </span> -->
        <!-- </li> -->

        <li class="block mt-5 xl:inline-block xl:mt-0 mr-8 text-[#31393C] astro-5KNYCIEN">
          <span class="group relative inline-block astro-5KNYCIEN">
            <span class="flex gap-2 astro-5KNYCIEN"><a href="#" class="text-sm md:text-base astro-5KNYCIEN">Industries</a>${renderComponent($$result, "Image", $$Image, { "src": down_arrow, "alt": "Down Arrow", "class": "astro-5KNYCIEN" })}</span>
            <!-- <a href="#" class="text-sm md:text-base">Industries</a> -->
            <ul class="sub-menu lg:absolute z-10 hidden submenu-bg lg:top-[3.75rem] py-2 pr-[2.75rem] lg:-left-[1.5rem] left-[5rem] top-[0.75rem] group-hover:block overflow-x-hidden astro-5KNYCIEN">
              <li class=" astro-5KNYCIEN">
                <a class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base astro-5KNYCIEN" href="/manufacturing">Manufacturing</a>
              </li>
              <li class=" astro-5KNYCIEN">
                <a class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base astro-5KNYCIEN" href="/textile">Textile</a>
              </li>
              <!-- <li class="">
                <a
                  class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base"
                  href="#">Healthcare</a
                >
              </li> -->
              <li class=" astro-5KNYCIEN">
                <a class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base astro-5KNYCIEN" href="/retail">Retail</a>
              </li>
              <!-- <li class="">
                <a
                  class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base"
                  href="#">Construction</a
                >
              </li> -->
              <!-- <li class="">
                <a
                  class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base"
                  href="#">Crowdfunding</a
                >
              </li> -->
              <li class=" astro-5KNYCIEN">
                <a class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base astro-5KNYCIEN" href="/hr-payroll">Human Resources</a>
              </li>
              <!-- <li class="">
                <a
                  class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base"
                  href="#">Ayurveda</a
                >
              </li> -->
            </ul>
          </span>
        </li>

        <li class="block xl:inline-block xl:mt-0 mr-8 text-[#31393C] astro-5KNYCIEN">
          <a href="/migoo-case-study" class="text-sm md:text-base astro-5KNYCIEN">
            Case Study</a>
        </li>
        <!-- <li
                    class="block  lg:inline-block lg:mt-0 mr-8 text-[#31393C]"
                >
                    <a href="/about" class="text-sm md:text-base"> Company</a>
                </li> -->
        <li class="block xl:inline-block xl:mt-0 mr-8 text-[#31393C] astro-5KNYCIEN">
          <span class="group relative inline-block astro-5KNYCIEN">
            <span class="flex gap-2 astro-5KNYCIEN"><a href="#" class="text-sm md:text-base astro-5KNYCIEN">Company</a>${renderComponent($$result, "Image", $$Image, { "src": down_arrow, "alt": "Down Arrow", "class": "astro-5KNYCIEN" })}</span>
            <!-- <a href="#" class="text-sm md:text-base">Company</a> -->
            <ul class="sub-menu lg:absolute z-10 hidden submenu-bg lg:top-[3.75rem] py-2 pr-[2.75rem] lg:-left-[1.5rem] left-[5rem] top-[0.75rem] group-hover:block overflow-x-hidden astro-5KNYCIEN">
              <li class=" astro-5KNYCIEN">
                <a class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base astro-5KNYCIEN" href="/about">About</a>
              </li>
              <li class=" astro-5KNYCIEN">
                <a class="whitespace-pre block text-[#4D5F66] hover:text-[#3E96F4] py-2 lg:px-5 px-5 text-sm md:text-base astro-5KNYCIEN" href="/career">Career</a>
              </li>
            </ul>
          </span>
        </li>
        <!-- <li class="block xl:inline-block xl:mt-0 mr-8 text-[#31393C]">
          <a href="/contact-us" class="text-sm md:text-base"> Contact</a>
        </li> -->
        <li class="hidden bg-[#3E96F4] lg:inline-block px-4 xl:px-6 py-1 xl:py-2 !leading-8 rounded-md text-white font-semibold font-inter astro-5KNYCIEN">
          <a href="/contact-us" class="text-sm md:text-base astro-5KNYCIEN">Inquire Now</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/components/navbar.astro", void 0);

const footer_logo = {"src":"/_astro/footer_logo.99117884.svg","width":201,"height":57,"format":"svg"};

const linkedin_footer = {"src":"/_astro/linkedin-footer.06c1f3e6.svg","width":16,"height":19,"format":"svg"};

const fb = {"src":"/_astro/fb.497df3c0.svg","width":11,"height":19,"format":"svg"};

const instagram = {"src":"/_astro/insta-footer.6dea8114.svg","width":16,"height":19,"format":"svg"};

const phone = {"src":"/_astro/phone.103393aa.svg","width":11,"height":15,"format":"svg"};

const map = {"src":"/_astro/map.270635be.svg","width":8,"height":15,"format":"svg"};

const email = {"src":"/_astro/email.06b43209.svg","width":14,"height":15,"format":"svg"};

const form_bg = {"src":"/_astro/form-bg.5abbde85.svg","width":336,"height":319,"format":"svg"};

const right = {"src":"/_astro/right.403afc82.svg","width":8,"height":14,"format":"svg"};

const $$Astro$2 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#3E96F4] flex flex-wrap relative mt-[3.125rem] md:mt-[3.125rem] lg:mt-[6.25rem] astro-K2F5ZB5C" id="section">
    <div class="bg-lets-craft w-full md:w-5/12 bg-no-repeat bg-center bg-cover flex place-items-end justify-center astro-K2F5ZB5C">
    <!-- class="block md:absolute md:left-80 md:-top-32 ml-0 md:ml-auto"     -->
    <!-- class="block md:absolute f_left f_top ml-0 md:ml-auto" -->

    ${renderComponent($$result, "Image", $$Image, { "src": form_bg, "alt": "form_bg", "alt": "Image description", "class": "block md:absolute  ml-0 md:ml-auto astro-K2F5ZB5C" })}
    </div>
    <div class="mx-5 md:max-w-7xl md:mx-auto w-full md:w-7/12 md:px-24 p-0 py-3 md:p-10 astro-K2F5ZB5C">
        <h2 class="font-semibold text-white text-2xl md:text-3xl lg:text-4xl astro-K2F5ZB5C">
            Let's craft awesomeness together!
        </h2>
        <div class="mt-5 flex justify-between bg-white rounded-lg px-5 py-3 w-56 astro-K2F5ZB5C">
            <a href="/contact-us" class="text-[#3E96F4] text-sm md:text-base font-semibold font-inter astro-K2F5ZB5C">Fill up a form now.</a>
            ${renderComponent($$result, "Image", $$Image, { "src": right, "width": 6, "height": 12, "alt": "right arrow ", "class": "astro-K2F5ZB5C" })}
        </div>
    </div>
    
</section>

<footer class="bg-[#31393C] py-10 md:py-16 lg:py-20 astro-K2F5ZB5C">
    <!-- <div class="md:max-w-7xl md:mx-auto md:px-24 flex flex-wrap text-white">
        <div class="sm:w-full md:w-3/12 lg:w-3/12">
            <Image src="'../../public/Images/footer_logo.svg" />
            <p class="text-sm leading-6 mt-5">
                ServiceNow and ERPNext Consulting, Implementation and
                Development Specialist.
            </p>
            <div class="my-5 pr-4">
                <div class="flex space-x-6 mt-6 md:mt-6 lg:mt-8">
                    <a href="https://in.linkedin.com/company/sanskar-technolab-pvt-ltd" class="text-gray-400">
                        <Image
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                            src="../../public/Images/linkedin-footer.svg"
                        />
                        <p class="sr-only">Linkedin account</p>
                    </a>
                    <a href="https://www.facebook.com/SanskarTechnolab/" class="text-gray-400">
                        <Image
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                            src="../../public/Images/fb.svg"
                        />
                        <p class="sr-only">Facebook page</p>
                    </a>
                    <a href="https://www.instagram.com/sanskartechnolab/" class="text-gray-400">
                        <Image
                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                            src="../../public/Images/insta-footer.svg"
                        />
                        <p class="sr-only">Instagram page</p>
                    </a>
                </div>
            </div>
        </div>
        <div class="sm:w-full md:w-3/12 lg:w-3/12">
            <div class="text-base text[#F7FFFF] font-bold">ServiceNow</div>
            <div class="grid gap-5 mt-5">
                <p class="text-sm ">ServiceNow Development</p><hr>
                <p class="text-sm ">ServiceNow Partner</p><hr>
                <p class="text-sm ">ServiceNow Consultation</p><hr>
                <p class="text-sm ">Hire ServiceNow Developer</p><hr>
            </div>
        </div>
        <div class="sm:w-full md:w-3/12 lg:w-3/12">
            <div class="text-base text[#F7FFFF] font-bold">ERPNext</div>
            <div class="grid gap-5 mt-5">
                <p class="text-sm ">ERPNext Partner</p><hr class="">
                <p class="text-sm ">ERPNext Amazon Integration</p><hr>
            </div>
        </div>
        <div class="sm:w-full md:w-3/12 lg:w-3/12">
            <div class="text-base text[#F7FFFF] font-bold">Contact</div>
        </div>
    </div> -->

    <div class="md:max-w-7xl mx-5 md:mx-auto md:px-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7lg:gap-10 text-white astro-K2F5ZB5C">
        <div class=" astro-K2F5ZB5C">
            <a href="/" class="astro-K2F5ZB5C">
                ${renderComponent($$result, "Image", $$Image, { "src": footer_logo, "alt": "logo", "class": "astro-K2F5ZB5C" })}</a>
            <p class="!text-sm leading-6 mt-5 astro-K2F5ZB5C">
                ServiceNow and ERPNext Consulting, Implementation and
                Development Specialist.
            </p>
            <div class="my-5 pr-4 astro-K2F5ZB5C">
                <div class="flex space-x-6 mt-6 md:mt-6 lg:mt-8 astro-K2F5ZB5C">
                    <a href="https://in.linkedin.com/company/sanskar-technolab-pvt-ltd" class="text-gray-400 astro-K2F5ZB5C">
                        ${renderComponent($$result, "Image", $$Image, { "class": "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 astro-K2F5ZB5C", "src": linkedin_footer, "alt": "linkedin_footer" })}
                        <p class="sr-only astro-K2F5ZB5C">Linkedin account</p>
                    </a>
                    <a href="https://www.facebook.com/SanskarTechnolab/" class="text-gray-400 astro-K2F5ZB5C">
                        ${renderComponent($$result, "Image", $$Image, { "class": "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 astro-K2F5ZB5C", "src": fb, "alt": "facebook" })}
                        <p class="sr-only astro-K2F5ZB5C">Facebook page</p>
                    </a>
                    <a href="https://www.instagram.com/sanskartechnolab/" class="text-gray-400 astro-K2F5ZB5C">
                        ${renderComponent($$result, "Image", $$Image, { "class": "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 astro-K2F5ZB5C", "src": instagram, "alt": "instagram" })}
                        <p class="sr-only astro-K2F5ZB5C">Instagram page</p>
                    </a>
                </div>
            </div>
        </div>
       <div class=" astro-K2F5ZB5C">
            <h4 class="!text-base text[#F7FFFF] font-bold astro-K2F5ZB5C"> Industries</h4>
            <div class="grid gap-2 md:gap-2 lg:gap-3 mt-2 astro-K2F5ZB5C">
                
				<p class="border-bottom astro-K2F5ZB5C"></p> <a href="/manufacturing" class="mt-3 text-sm astro-K2F5ZB5C">Manufacturing</a>
                <a href="/textile" class="text-sm astro-K2F5ZB5C">Textile</a>
                <!--<a href="#" class="text-sm">Healthcare</a>-->
                <a href="/retail" class="text-sm astro-K2F5ZB5C">Retail</a>
				<!--<a href="#" class="text-sm">Construction</a>
                <a href="#" class="text-sm">Crowdfunding</a>-->
                <a href="/hr-payroll" class="text-sm astro-K2F5ZB5C">Human Resources</a>
                <!--<p class="border-bottom"></p><a href="#" class="text-sm">Ayurveda</a>-->
            </div>
        </div>

		 <div class=" astro-K2F5ZB5C">
            <h4 class="!text-base text[#F7FFFF] font-bold astro-K2F5ZB5C">Discover</h4>
                <div class="grid gap-2 md:gap-2 lg:gap-3 mt-2 astro-K2F5ZB5C">
                    <p class="border-bottom astro-K2F5ZB5C"></p><a href="/about" class="mt-3 text-sm astro-K2F5ZB5C">About</a>
                    <a href="/career" class="text-sm astro-K2F5ZB5C">Career</a>
                    <a href="/contact-us" class="text-sm astro-K2F5ZB5C">Contact</a>
                    <a href="/migoo-case-study" class="text-sm astro-K2F5ZB5C">Migoo Case Study</a>
                    <a href="/chatgpt-integration" class="text-sm astro-K2F5ZB5C">ChatGPT Integration</a>
                </div>
        </div>
         <div class="astro-K2F5ZB5C">
            <h4 class="!text-base text[#F7FFFF] font-bold astro-K2F5ZB5C">Contact</h4>
            <div class="!text-sm mt-5 astro-K2F5ZB5C">
                <div class="flex gap-1 astro-K2F5ZB5C">
                    <div class="w-1/12 astro-K2F5ZB5C"><a href="https://www.google.com/maps/search/A-706,+Privilon,+Behind+Iscon+Temple,+Iscon+cross+Road,+SG+Highway,+Ahmedabad./@23.0282855,72.5032655,17z/data=!3m1!4b1?entry=ttu" class="flex gap-2 astro-K2F5ZB5C">${renderComponent($$result, "Image", $$Image, { "class": "ml-1 mt-1 astro-K2F5ZB5C", "src": map, "alt": "map" })}</a></div>
                    <div class="w-11/12 astro-K2F5ZB5C"> A-706, Privilon, Behind Iscon Temple, Iscon cross Road, SG Highway, Ahmedabad. (Gujarat-India) </div>
                </div>
                <div class="flex mt-7 gap-1 astro-K2F5ZB5C">
                    <div class="w-1/12 astro-K2F5ZB5C"><a href="mailto:info@sanskartechnolab.com" class="astro-K2F5ZB5C">${renderComponent($$result, "Image", $$Image, { "src": email, "alt": "email", "class": "astro-K2F5ZB5C" })}</a></div>
                    <div class="w-11/12 astro-K2F5ZB5C"><p class="astro-K2F5ZB5C">info@sanskartechnolab.com</p></div>
                </div>
                <div class="flex gap-1 astro-K2F5ZB5C">
                    <div class="w-1/12 flex lg:justify-center astro-K2F5ZB5C"><a href="tel:+91 9558112081" class="mt-3 flex gap-2 astro-K2F5ZB5C">${renderComponent($$result, "Image", $$Image, { "src": phone, "alt": "phone", "class": "astro-K2F5ZB5C" })}</a></div>
                    <div class="w-11/12 mt-3 astro-K2F5ZB5C">(+91) 95581 12081</div>
                </div>
            </div>
        </div>
    </div>
</footer>

<section class="bg-[#04000E] astro-K2F5ZB5C">
    <p class="md:max-w-7xl md:mx-auto md:px-24 text-center p-2 astro-K2F5ZB5C">
        <span class="text-[#918F96] text-sm leading-3 astro-K2F5ZB5C">&copy; 2023 Sanskar Technolab All Rights Reserved</span>
    </p>
</section>`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/components/footer.astro", void 0);

const scroll = {"src":"/_astro/scroll-top.a3bfd853.svg","width":42,"height":42,"format":"svg"};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, keyword = "", description = "", canonical_href = "" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en">\n	<head>\n		<meta charset="UTF-8">\n		<!-- <meta name="description" content="Astro description" /> -->\n		<meta name="viewport" content="width=device-width">\n		<!-- <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> -->\n		<meta name="generator"', '>\n		<meta name="robots" content="noindex,nofollow">\n\n		', "\n		", "\n\n		", "\n\n		<title>", '</title>\n		<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">\n		<link rel="icon" href="../../public/Images/favicon/favicon-32x32.png" sizes="32x32">\n		<link rel="preconnect" href="https://fonts.googleapis.com">\n		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet">\n		<link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.css" rel="stylesheet"> \n		<link href="https://unpkg.com/swiper/swiper-bundle.min.css" rel="stylesheet">\n\n		<!-- <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/> -->\n\n		<!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css" rel="stylesheet" /> -->\n\n		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css">\n\n		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css">\n\n		<!-- <script src="https://www.google.com/recaptcha/api.js" async defer><\/script> -->\n		  \n	', '</head>\n	<body>\n		<main>\n			<div class="fixed right-5 bottom-5 z-10 hidden items-center cursor-pointer" id="s_top">\n				', "\n				<!-- Scroll To Top -->\n			</div>\n			", "\n			", "\n			", '\n			<!-- <script \n				src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.js" defer\n			><\/script> -->\n			<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer><\/script>\n				<!-- <script src="../../node_modules/flowbite/dist/flowbite.min.js" defer><\/script> -->\n				<script src="https://unpkg.com/swiper/swiper-bundle.min.js" defer><\/script>\n				<script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js" defer><\/script>\n\n				<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js" defer><\/script> -->\n				\n				<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js" defer><\/script> -->\n\n		</main>\n		\n	</body>\n</html>'])), addAttribute(Astro2.generator, "content"), keyword && renderTemplate`<meta name="keyword"${addAttribute(keyword, "content")}>`, description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`, canonical_href && renderTemplate`<link rel="canonical"${addAttribute(canonical_href, "href")}>`, title, renderHead(), renderComponent($$result, "Image", $$Image, { "src": scroll, "alt": "scroll to top" }), renderComponent($$result, "Navbar", $$Navbar, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/layouts/Layout.astro", void 0);

const right_arrow = {"src":"/_astro/right-arrow.d6d631d2.svg","width":8,"height":14,"format":"svg"};

const about_banner = {"src":"/_astro/about-banner.3fb1e945.svg","width":882,"height":616,"format":"svg"};

const twelve = {"src":"/_astro/g_12.dbeea37b.svg","width":76,"height":63,"format":"svg"};

const fifty = {"src":"/_astro/g_50.fdb81971.svg","width":84,"height":84,"format":"svg"};

const ten = {"src":"/_astro/g_10.edc4bf44.svg","width":63,"height":63,"format":"svg"};

const two = {"src":"/_astro/g_2.dfdbcc56.svg","width":62,"height":63,"format":"svg"};

const unique_approach = {"src":"/_astro/unique-approach.586d9555.svg","width":409,"height":389,"format":"svg"};

const mission = {"src":"/_astro/mission.bf4d57f9.svg","width":48,"height":48,"format":"svg"};

const our_approach = {"src":"/_astro/our-approach.47756169.svg","width":49,"height":48,"format":"svg"};

const in_action = {"src":"/_astro/in-action.79f0fd21.svg","width":49,"height":49,"format":"svg"};

const drive_to_innovation = {"src":"/_astro/drive-to-innovation.c4e31e96.svg","width":48,"height":34,"format":"svg"};

const innovative_mind = {"src":"/_astro/innovative-mind.9a7aa0fa.svg","width":56,"height":64,"format":"svg"};

const continuous_learn = {"src":"/_astro/continuous-learn.12491c18.svg","width":63,"height":64,"format":"svg"};

const customer_center = {"src":"/_astro/customer-center.8fe474f4.svg","width":65,"height":64,"format":"svg"};

const ethical = {"src":"/_astro/ethical.beb312f9.svg","width":71,"height":64,"format":"svg"};

const end_to_end = {"src":"/_astro/end-to-end.fa70b429.svg","width":66,"height":66,"format":"svg"};

const adaptability = {"src":"/_astro/adaptability.55c39689.svg","width":60,"height":64,"format":"svg"};

const tree_plant = {"src":"/_astro/tree-plant.a0fff42b.svg","width":215,"height":201,"format":"svg"};

const ellipse = {"src":"/_astro/ellipse.48620d0d.svg","width":277,"height":4,"format":"svg"};

const support_vrudhashram = {"src":"/_astro/support-vrudhashram.fba7bc22.svg","width":181,"height":209,"format":"svg"};

const support_dog = {"src":"/_astro/support-dog.5665ebf3.svg","width":232,"height":162,"format":"svg"};

const impactful_story = {"src":"/_astro/impactful-story.55d54007.png","width":483,"height":486,"format":"png"};

const anand_thakker = {"src":"/_astro/anand_thakker.d5fce12e.svg","width":180,"height":180,"format":"svg"};

const kirit_gajera = {"src":"/_astro/kirit_gajera.e8c4aae9.svg","width":180,"height":180,"format":"svg"};

const brilliant_working = {"src":"/_astro/brilliant_working.da4b5685.svg","width":938,"height":693,"format":"svg"};

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Sanskar Technolabs | ERPNext software development company", ",": true, "keyword": "erp implementation, Erpnext solution company, ERPnext development services, Erpnext solution company, ERPNext software development company, Servicenow implementation services", ",": true, "description": " Here\u2019s the subtle glimpses about the journey of Sanskar Technolabs, The best ERPNext Implementation partner.", ",": true, "canonical_href": "https://astro.sanskartechnolab.com/about", "class": "astro-KH7BTL4R" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead()}<section class="section-bg-right astro-KH7BTL4R">
		<div class="hidden lg:flex h-[calc(100vh-10vh)] lg:py-[0rem] xl:py-[24rem] 2xl:py-[24rem] relative flex-wrap items-center  astro-KH7BTL4R">
			${renderComponent($$result2, "Image", $$Image, { "class": "absolute right-0 w-7/12 lg:pr-[0rem] xl:pr-[0rem] 2xl:pr-[12rem] lg:pt-[6rem] xl:pt-0 astro-KH7BTL4R", "src": about_banner, "alt": "banner image", "width": 1002, "height": 616 })}
			<div class="mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 flex container astro-KH7BTL4R">
				<div class="w-7/12 astro-KH7BTL4R">
			<h1 class="lg:text-[2.75rem] xl:text-[3.5rem] 2xl:text-[3.5rem]  lg:mt-[-6rem] xl:mt-[-16rem] text-[#31393C] font-semibold lg:leading-[3.75rem] xl:leading-[4rem] astro-KH7BTL4R">
						Efficient workflows.<br class="astro-KH7BTL4R"> Satisfied customers.<br class="astro-KH7BTL4R"> Productive Workforce. 
					</h1>
					<p class="text[#31393C] font-normal lg:text-base xl:text-lg mt-5 leading-7 astro-KH7BTL4R">
						Sanskar Technolabs is reshaping enterprise operations with the <br class="astro-KH7BTL4R"> best tech and an experienced team of professionals!	
					</p>
				</div>
			</div>
		</div>

		<div class="mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 flex lg:hidden flex-wrap items-center justify-between pt-10 pb-5 h-[calc(100vh-9vh)] astro-KH7BTL4R">
			<div class=" astro-KH7BTL4R">
				<div class="text-[1.75rem] md:text-[3rem] text-[#31393C] font-semibold leading-9 md:leading-[3.5rem] astro-KH7BTL4R">
						Efficient workflows.<br class="astro-KH7BTL4R"> Productive Workforce. <br class="astro-KH7BTL4R"> Satisfied customers.
				</div>
					<p class="text[#31393C] font-normal md:text-base mt-3 md:mt-5 leading-5 md:leading-6 astro-KH7BTL4R">
						Sanskar Technolabs is reshaping enterprise <br class="astro-KH7BTL4R"> operations with the best tech and an experienced <br class="astro-KH7BTL4R"> team of professionals!	
					</p>
			</div>
			${renderComponent($$result2, "Image", $$Image, { "src": about_banner, "alt": "banner image", "class": "mb-12 md:mb-0 mt-5 astro-KH7BTL4R", "width": 1002, "height": 616 })}
		</div>
	</section>

	<section class="pb-[3.125rem] md:pb-[3.125rem] lg:pb-[6.25rem] astro-KH7BTL4R">
			<div class="mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 mt-0 md:mt-0 lg:mt-0 xl:mt-0 astro-KH7BTL4R">
				<h2 class="text-center font-semibold text-[#31393C] text-2xl md:text-3xl lg:text-4xl leading-[2.25rem] md:leading-[2.50rem] lg:leading-[2.75rem] astro-KH7BTL4R">Who are we?</h2>				
				<p class="mt-2 md:mt-3 lg:mt-4 text-center font-normal leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base text-[#31393C] astro-KH7BTL4R">Sanskar Technolab has been the leading ERPNEXT & ServiceNow implementation partner serving enterprises for the past 12 <br class="hidden md:hidden lg:block astro-KH7BTL4R"> years. We have a dedicated team of over 50+ skilled developers, designers, and project managers who will understand <br class="hidden md:hidden lg:block astro-KH7BTL4R"> clients' requirements and offer solutions accordingly.</p>
				<div class="pt-6 md:pt-8 lg:pt-12 pb-6 md:pb-8 lg:pb-12 text-center font-semibold text-[1.25rem] md:text-[1.50rem] lg:text-[1.75rem] leading-7 md:leading-8 lg:leading-9 text-[#31393C] astro-KH7BTL4R">Sneak Peek into our growing numbers!</div>
					<div class="flex flex-wrap justify-center text-center gap-6 md:gap-8 lg:gap-16 text-[#31393C] astro-KH7BTL4R">
						<div class="let-shadow w-56 h-54 p-5 grid justify-items-center astro-KH7BTL4R">
							${renderComponent($$result2, "Image", $$Image, { "class": " astro-KH7BTL4R", "src": twelve, "alt": "12+ Years of Excellence", "width": 74, "height": 60 })}	
							<p class="text-[3.5rem] md:text-[3.75rem] lg:text-[4rem] font-bold astro-KH7BTL4R">12+</p>
							<p class="font-normal text-base astro-KH7BTL4R">Years of Excellence</p>
						</div>
						<div class="let-shadow w-56 h-54 p-5 grid justify-items-center astro-KH7BTL4R">
							${renderComponent($$result2, "Image", $$Image, { "src": fifty, "alt": "12+ Years of Excellence", "width": 64, "height": 60, "class": "astro-KH7BTL4R" })}	
							<p class="text-[3.5rem] md:text-[3.75rem] lg:text-[4rem] font-bold astro-KH7BTL4R">50+</p>
							<p class="font-normal text-base astro-KH7BTL4R">Dedicated team</p>
						</div>
						<div class="let-shadow w-56 h-54 p-5 grid justify-items-center astro-KH7BTL4R">
							${renderComponent($$result2, "Image", $$Image, { "src": ten, "alt": "12+ Years of Excellence", "width": 61, "height": 61, "class": "astro-KH7BTL4R" })}	
							<p class="text-[3.5rem] md:text-[3.75rem] lg:text-[4rem] font-bold astro-KH7BTL4R">10+</p>
							<p class="font-normal text-base astro-KH7BTL4R">Industries Served!</p>
						</div>
						<div class="let-shadow w-56 h-54 p-5 grid justify-items-center astro-KH7BTL4R">
							${renderComponent($$result2, "Image", $$Image, { "src": two, "alt": "12+ Years of Excellence", "width": 60, "height": 60, "class": "astro-KH7BTL4R" })}	
							<p class="text-[3.5rem] md:text-[3.75rem] lg:text-[4rem] font-bold astro-KH7BTL4R">2</p>
							<p class="font-normal text-base astro-KH7BTL4R">Work Hubs</p>
						</div>
					</div>
			</div>
		</section>

		<section class="section-bg-left py-[3.125rem] md:py-[2rem] lg:py-[4rem] astro-KH7BTL4R">
			<div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10  mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 astro-KH7BTL4R">
				<div class="astro-KH7BTL4R">
					<h2 class="text-2xl md:text-3xl text-center md:text-center lg:text-start lg:text-4xl mr-0 md:mr-0 lg:mr-20 leading-[2rem] md:leading-[2.50rem] lg:leading-[2.75rem] font-semibold text-[#31393C] astro-KH7BTL4R">Sanskar Technolab's unique approach to setting up enterprises for success!</h2>
					<div class="flex flex-wrap justify-center md:justify-center lg:justify-start astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "flex flex-wrap justify-center items-center mt-10 md:mt-12 lg:mt-16 astro-KH7BTL4R", "src": unique_approach, "alt": "Unique Approach", "width": 409, "height": 389 })}
					</div>
				</div>

				<div class="ml-0 md:ml-0 lg:ml-[0rem] xl:ml-[-4.375rem] astro-KH7BTL4R">
					<div class="flex gap-4 md:gap-4 lg:gap-6 astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "object-none object-left-top astro-KH7BTL4R", "src": mission, "alt": "Our Mission", "width": 48, "height": 48 })}
						<div class="pb-2 md:pb-3 lg:pb-4 astro-KH7BTL4R">
							<p class="pb-2 text-base md:text-lg lg:text-xl leading-5 md:leading-6 lg:leading-7 font-semibold text-[#31393C] astro-KH7BTL4R">Our Mission</p>
							<p class="pb-2 text-xs md:text-sm lg:text-base leading-4 md:leading-5 leading-6 font-normal text-[#31393C] astro-KH7BTL4R">To be the guiding light for global brands in the digital world, addressing unique customers' needs by thoroughly understanding their pain points, challenges, and aspirations with innovative enterprise solutions.</p>							
						</div>
					</div>

					<div class="flex gap-4 md:gap-4 lg:gap-6 astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "object-none object-left-top astro-KH7BTL4R", "src": our_approach, "alt": "Our Approach", "width": 49, "height": 48 })}
						<div class="pb-2 md:pb-3 lg:pb-4 astro-KH7BTL4R">
							<p class="pb-2 text-base md:text-lg lg:text-xl leading-5 md:leading-6 lg:leading-7 font-semibold text-[#31393C] astro-KH7BTL4R">Our Approach</p>
							<p class="pb-2 text-xs md:text-sm lg:text-base leading-4 md:leading-5 leading-6 font-normal text-[#31393C] astro-KH7BTL4R">We adopt a unique and client-centric approach to deliver desired and customized solutions by leveraging the best in class technology, and standard development trends, targeting their pain points and USP(unique selling point) for bringing the best to the table for our clients and their end users.</p>							
						</div>
					</div>

					<div class="flex gap-4 md:gap-4 lg:gap-6 astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "object-none object-left-top astro-KH7BTL4R", "src": in_action, "alt": "In Action", "width": 49, "height": 49 })}
						<div class="pb-2 md:pb-3 lg:pb-4 astro-KH7BTL4R">
							<p class="pb-2 text-base md:text-lg lg:text-xl leading-5 md:leading-6 lg:leading-7 font-semibold text-[#31393C] astro-KH7BTL4R">In Action</p>
							<p class="pb-2 text-xs md:text-sm lg:text-base leading-4 md:leading-5 leading-6 font-normal text-[#31393C] astro-KH7BTL4R">We dive deep into our client's unique needs, leveraging deep industry knowledge, cutting-edge technology, and a sprinkle of creativity to craft customized IT solutions that solve our client's challenges and help them achieve a competitive edge, and bring their digital dreams to life.</p>							
						</div>
					</div>

					<div class="flex gap-4 md:gap-4 lg:gap-6 astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "object-none object-left-top astro-KH7BTL4R", "src": drive_to_innovation, "alt": "Drive To Innovation", "width": 48, "height": 34 })}
						<div class="pb-0 md:pb-3 lg:pb-4 astro-KH7BTL4R">
							<p class="pb-2 text-base md:text-lg lg:text-xl leading-5 md:leading-6 lg:leading-7 font-semibold text-[#31393C] astro-KH7BTL4R">Join Our Drive to Innovation</p>
							<p class="pb-0 md:pb-0 lg:pb-2 text-xs md:text-sm lg:text-base leading-4 md:leading-5 leading-6 font-normal text-[#31393C] astro-KH7BTL4R">If you're seeking a trusted partner who understands the digital landscape, infuses innovation into every solution, and unlocks the full potential of your business, join us on this exciting IT adventure. Together, we'll develop a transformative solution for your business's success.</p>							
						</div>
					</div>
				</div>
			</div>

			<div class="hidden lg:block mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 pt-[3.125rem] md:pt-[3.125rem] lg:pt-[6.25rem] astro-KH7BTL4R">
				<div class="bg-image bg-cover bg-no-repeat bg-center md:bg-contain md:bg-right h-96 grid p-16 pt-24 items-center astro-KH7BTL4R">
					<h2 class="w-10/12 pr-16 lg:text-2xl xl:text-4xl lg:leading-[2.25rem] xl:leading-[2.75rem] text-white font-semibold astro-KH7BTL4R">
							Partner with us to unleash the potential of the best tech for your business!
						</h2>
					<div class="text-white text-base font-semibold flex items-center gap-3 lg:-mt-20 xl:-mt-16 font-inter astro-KH7BTL4R">
					<div class="flex justify-between bg-white rounded-lg lg:px-4 xl:px-5 py-2 w-56 astro-KH7BTL4R">
								<a href="/contact-us" class="text-[#3E96F4] font-semibold text-base font-inter astro-KH7BTL4R">Book a free demo.</a>
								${renderComponent($$result2, "Image", $$Image, { "src": right_arrow, "alt": "Drive To Innovation", "width": 6, "height": 12, "class": "astro-KH7BTL4R" })}
							</div>
					</div>
				</div>
			</div>
		</section>	

		<section class="astro-KH7BTL4R">
			<div class="mx-5 md:max-w-7xl py-[3.125rem] md:py-[2rem] lg:py-[4rem] md:mx-auto md:px-24 astro-KH7BTL4R">
				<h2 class="text-2xl md:text-3xl lg:text-4xl leading-[2rem] md:leading-[2.25rem] lg:leading-[2.75rem] pb-2 md:pb-3 lg:pb-4 text-center font-semibold text-[#31393C] astro-KH7BTL4R">Our Core Values</h2>
				<p class="text-xs md:text-sm lg:text-base text-center text-[#000000] font-semibold leading-4 md:leading-5 lg:leading-6 astro-KH7BTL4R">Our Guiding Principles to drive the desired action.</p>
				<div class="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-10 lg:mt-14 mb-0 md:mb-0 lg:mb-0 gap-6 md:gap-10 lg:gap-14 astro-KH7BTL4R">
					<div class="flex flex-col items-center astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "pb-1 md:pb-2 lg:pb-3 astro-KH7BTL4R", "src": innovative_mind, "alt": "Innovative Mind", "width": 56, "height": 64 })}
						<p class="pb-0 md:pb-0 lg:pb-1 text-[#31393C] leading-7 md:leading-8 lg:leading-9 text-base md:text-lg lg:text-xl font-semibold astro-KH7BTL4R">Innovative minds!</p>
						<p class="text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Serving excellence with innovation.</p>
					</div>
					<div class="flex flex-col items-center astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "pb-1 md:pb-2 lg:pb-3 astro-KH7BTL4R", "src": continuous_learn, "alt": "Continuous Learning", "width": 63, "height": 64 })}
						<p class="pb-0 md:pb-0 lg:pb-1 text-[#31393C] leading-7 md:leading-8 lg:leading-9 text-base md:text-lg lg:text-xl font-semibold astro-KH7BTL4R">Continuous Learning.</p>
						<p class="text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Constantly Learning & Growing together!</p>
					</div>
					<div class="flex flex-col items-center astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "pb-1 md:pb-2 lg:pb-3 astro-KH7BTL4R", "src": customer_center, "alt": "Customer at the center", "width": 65, "height": 64 })}
						<p class="pb-0 md:pb-0 lg:pb-1 text-center text-[#31393C] leading-7 md:leading-8 lg:leading-8 xl:leading-9 text-base md:text-lg lg:text-xl font-semibold astro-KH7BTL4R">The customer at the center!</p>
						<p class="text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Keeping our customers at the center.</p>
					</div>
					<div class="flex flex-col items-center astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "pb-1 md:pb-2 lg:pb-3 astro-KH7BTL4R", "src": ethical, "alt": "Ethical", "width": 71, "height": 64 })}
						<p class="pb-0 md:pb-0 lg:pb-1 text-[#31393C] leading-7 md:leading-8 lg:leading-9 text-base md:text-lg lg:text-xl font-semibold astro-KH7BTL4R">Ethical Standards.</p>
						<p class="text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Transparency. Honesty. Integrity.</p>
					</div>
					<div class="flex flex-col items-center astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "pb-1 md:pb-2 lg:pb-3 astro-KH7BTL4R", "src": end_to_end, "alt": "End-to-end collaboration ", "width": 64, "height": 64 })}
						<p class="text-center pb-0 md:pb-0 lg:pb-1 text-[#31393C] leading-7 md:leading-8 lg:leading-8 xl:leading-9 text-base md:text-lg lg:text-xl font-semibold astro-KH7BTL4R">End-to-end collaboration.</p>
						<p class="text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Fostering a collaborative environment</p>
					</div>
					<div class="flex flex-col items-center astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "pb-1 md:pb-2 lg:pb-3 astro-KH7BTL4R", "src": adaptability, "alt": "Adaptability", "width": 60, "height": 64 })}
						<p class="pb-0 md:pb-0 lg:pb-1 text-[#31393C] leading-7 md:leading-8 lg:leading-9 text-base md:text-lg lg:text-xl font-semibold astro-KH7BTL4R">Adaptability</p>
						<p class="text-center text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Adapting to emerging trends and customer preferences</p>
					</div>				
				</div>
			</div>
		</section>

		<section class="mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 text-center py-[3.125rem] md:py-[2rem] lg:py-[4rem] astro-KH7BTL4R">
					<div class="text-center astro-KH7BTL4R">
						<h2 class="text-2xl md:text-3xl lg:text-4xl lg:text-[2.25rem] text-[#31393C] font-semibold astro-KH7BTL4R">
							Our Team
						</h2>
						<p class="text-[#31393C] text-base md:text-xl lg:text-2xl mt-2 md:mt-3 lg:mt-5 font-semibold astro-KH7BTL4R">
							The Top-notch management of Sanskar Technolabs
						</p>
						<p class="text-black text-xs md:text-sm lg:text-base font-semibold mt-1 md:mt-1 lg:mt-2 astro-KH7BTL4R">
							Meet the Core Team who laid the foundation & driving
							Sanskar Technolabs to New Heights.
						</p>
					</div>
					<div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 md;gap-10 lg:gap-28 mt-10 md:mt-10 lg:mt-12 text-[#31393C] astro-KH7BTL4R">
						<div class="grid justify-items-center text-[#31393C] astro-KH7BTL4R">
							${renderComponent($$result2, "Image", $$Image, { "src": anand_thakker, "alt": "Anand Thakker", "class": "astro-KH7BTL4R" })}
							<div class="astro-KH7BTL4R">
								<p class="text-sm md:text-base lg:text-lg font-semibold mt-6 astro-KH7BTL4R">
									Anand Thakker
								</p>
								<p class="text-xs md:text-xs lg:text-sm font-semibold astro-KH7BTL4R">
									Founder & CEO at Sanskar Technolab
								</p>
							</div>
							<p class="text-xs md:text-sm lg:text-base mt-2 md:mt-2 lg:mt-4 astro-KH7BTL4R">
								Meet Anand Thakker, the visionary founder and
								CEO of Sanskar Technolab. With a decade of
								experience in providing innovative IT solutions
								to clients worldwide, Anand's leadership has
								taken the company to new heights. His unwavering
								dedication for innovation have been the driving
								force behind Sanskar Technolab's success and
								even helped businesses transform in the digital
								landscape.
							</p>
						</div>
						<div class="grid justify-items-center text-[#31393C] astro-KH7BTL4R">
							${renderComponent($$result2, "Image", $$Image, { "src": kirit_gajera, "alt": "Kirit Gajera", "class": "astro-KH7BTL4R" })}
							<div class="astro-KH7BTL4R">
								<p class="text-sm md:text-base lg:text-lg font-semibold mt-6 astro-KH7BTL4R">
									Kirit Gajera
								</p>
								<p class="text-xs md:text-xs lg:text-sm font-semibold astro-KH7BTL4R">
									COO at Sanskar Technolab
								</p>
							</div>
							<p class="text-xs md:text-sm lg:text-base mt-2 md:mt-2 lg:mt-4 astro-KH7BTL4R">
								Meet Kirit Gajera, the COO at Sanskar Technolab.
								With over two decades of diverse work experience
								in project management, business accument,
								technology, marketing, customer service, human
								resources, and product development - Kirit
								brings a wealth of expertise to the table. He is
								committed to remaining at the forefront of
								technological innovation and providing
								cutting-edge solutions.
							</p>
						</div>
					</div>
		</section>

		<section class="py-[3.125rem] md:py-[2rem] lg:py-[4rem] astro-KH7BTL4R">
			<div class="mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 astro-KH7BTL4R">
				<h2 class="text-center text-lg md:text-xl lg:text-2xl font-semibold mb-1 md:mb-1 lg:mb-2 mx-4 md:mx-20 lg:mx-48 astro-KH7BTL4R">Assets of Sanskar Technolabs - Brilliant Minds working to bring your ideas to life.</h2>
				<p class="text-center text-xs md:text-sm lg:text-base mb-6 md:mb-6 lg:mb-10 astro-KH7BTL4R">Our strength lies within Sanskar’s team who is constantly bringing out the best for our clients</p>
				<div class="flex justify-center astro-KH7BTL4R">
					${renderComponent($$result2, "Image", $$Image, { "src": brilliant_working, "alt": "Sanskar working", "width": 924, "height": 662, "class": "astro-KH7BTL4R" })}
				</div>
			</div>
		</section>


		<section class="section-bg-center astro-KH7BTL4R">
			<div class="mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 py-[3.125rem] md:py-[2rem] lg:py-[4rem] astro-KH7BTL4R">
				<h2 class="text-center text-[#31393C] font-semibold text-2xl md:text-3xl lg:text-4xl leading-[1.75rem] md:leading-[2.25rem] lg:leading-[2.75rem] pb-4 md:pb-6 lg:pb-8 astro-KH7BTL4R">Empowering Communities: <br class="astro-KH7BTL4R"> Sanskar Technolab's Dual Mission of Business <br class="hidden md:block astro-KH7BTL4R"> Excellence and Social Responsibility!</h2>
				<p class="text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal pb-2 md:pb-3 lg:pb-4 astro-KH7BTL4R">At Sanskar Technolabs, we believe in the power of collective impact and the importance of giving <br class="hidden md:hidden lg:block astro-KH7BTL4R"> back to society. As part of our commitment to social responsibility, we have partnered with Best <br class="hidden md:hidden lg:block astro-KH7BTL4R"> Deed, a leading crowdfunding platform, to support causes that align with our values.</p>
				<p class="text-center text-[#31393C] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-semibold astro-KH7BTL4R">Together, we have contributed to a range of initiatives close to our hearts...</p>
				<div class="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 my-4 md:my-10 lg:my-14 astro-KH7BTL4R">
					<div class="flex flex-col items-center  astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "pt-2 astro-KH7BTL4R", "src": tree_plant, "alt": "Tree Plantation Drive", "width": 215, "height": 201 })}
						${renderComponent($$result2, "Image", $$Image, { "class": " astro-KH7BTL4R", "src": ellipse, "alt": "Ellipse", "width": 277, "height": 4 })}
						<p class="pt-2 md:pt-3 lg:pt-4 text-[#31393C] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-semibold pb-10 md:pb-0 lg:pb-0 astro-KH7BTL4R">Tree Plantation Drive</p>
					</div>

					<div class="flex flex-col items-center astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": " astro-KH7BTL4R", "src": support_vrudhashram, "alt": "Support Vrudhashram", "width": 181, "height": 209 })}
						${renderComponent($$result2, "Image", $$Image, { "class": " astro-KH7BTL4R", "src": ellipse, "alt": "Ellipse", "width": 277, "height": 4 })}
						<p class="pt-2 md:pt-3 lg:pt-4 text-[#31393C] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-semibold  astro-KH7BTL4R">Support to Vrudhashram</p>
					</div>
					
					<div class="flex flex-col items-center astro-KH7BTL4R">
						${renderComponent($$result2, "Image", $$Image, { "class": "pt-12 astro-KH7BTL4R", "src": support_dog, "alt": "Support dogs & bullock", "width": 232, "height": 162 })}
						${renderComponent($$result2, "Image", $$Image, { "class": " astro-KH7BTL4R", "src": ellipse, "alt": "Ellipse", "width": 277, "height": 4 })}
						<p class="pt-2 md:pt-3 lg:pt-4 text-[#31393C] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-semibold pb-6 md:pb-0 lg:pb-0 astro-KH7BTL4R">Support for stray dogs & bullock</p>
					</div>
				</div>
				<p class="hidden md:hidden lg:hidden xl:block text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Through these collaborations, we aim to make a positive difference in the lives of those in need <br class="astro-KH7BTL4R"> and create a lasting impact on the communities we serve.</p>
				<p class="block md:block lg:block xl:hidden text-center text-[#000000] leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Through these collaborations, we aim to make a positive difference in the lives of those in need and create a lasting impact on the communities we serve.</p>
			</div>
		</section>

		<section class="py-[3.125rem] md:py-[2rem] lg:py-[4rem] astro-KH7BTL4R">
			<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-0 mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 astro-KH7BTL4R">
				 <div class="flex justify-center md:justify-center lg:justify-start astro-KH7BTL4R">
            ${renderComponent($$result2, "Image", $$Image, { "class": " astro-KH7BTL4R", "src": impactful_story, "alt": "Impactful Story", "width": 483, "height": 486 })}
        </div>
				<div class="astro-KH7BTL4R">
					<p class="text-[#31393C] pb-1 font-semibold text-[1rem] md:text-[1.375rem] lg:text-[1.75rem] leading-7 md:leading-8 lg:leading-9 astro-KH7BTL4R">Our Impactful Story: </p>
					<h2 class="text-[#31393C] pb-2 md:pb-4 lg:pb-6 font-semibold  text-2xl md:text-3xl lg:text-4xl leading-[1.75rem] md:leading-[2.25rem] lg:leading-[2.75rem] astro-KH7BTL4R">12 Years of Excellence & Innovation!</h2>
					<p class="text-[#31393C]  pb-2 md:pb-4 lg:pb-6 leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">Sanskar Technolabs was started 12 years ago with a clear mission & vision to leverage the best technologies and tools to offer out-of-the-box solutions for our client by adopting the best practices, target market preferences, and latest trends.</p>
					<p class="text-[#31393C]  pb-2 md:pb-4 lg:pb-6 leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R"> From our inception, we have consistently pushed the boundaries of excellence, fueled by continuous innovation and a commitment to providing tailored solutions. Placing our clients at the heart of everything we do, we strive to create not just solutions, but experiences that resonate with their unique needs.</p>
					<p class="text-[#31393C]  pb-2 md:pb-4 lg:pb-6 leading-4 md:leading-5 lg:leading-6 text-xs md:text-sm lg:text-base font-normal astro-KH7BTL4R">As we look ahead, our dedication to crafting desired solutions for both our clients and their end customers remains the same. ONWARDS & UPDWARDS! </p>
				</div>
			</div>
		</section>
` })}`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/about.astro", void 0);

const $$file = "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, BaseSSRService as B, $$Layout as a, right_arrow as b, about as c, down_arrow as d, error as e, isRemoteImage as i, metadata as m, right as r };
