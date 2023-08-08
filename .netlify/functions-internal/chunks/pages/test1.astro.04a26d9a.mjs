/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead } from '../astro.88467b2c.mjs';
import 'html-escaper';
import { $ as $$Layout } from './index.astro.729aeb89.mjs';
import 'cookie';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import 'path-to-regexp';
import 'mime';
import 'string-width';
/* empty css                           *//* empty css                           */
const $$Astro = createAstro("https://Pithiya-Nilesh.github.io");
const $$Test1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Test1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "test1" }, { "default": ($$result2) => renderTemplate`



${maybeRenderHead($$result2)}<div x-data="{ accordion: 0 }" class="grid gap-5 bg-[#EBF5FF] rounded-[20px] text-[#31393C] p-5 shadow drop-shadow-sm">
	<div class="bg-white rounded-2xl">
    <div class="flex justify-between p-5" @click="accordion = accordion == 0 ? 1 : 0">
    	<div class="cursor-pointer">Why should I pick ERPNext over other ERP products?</div>
      <img :class="accordion === 1 ? 'block' : 'hidden'" src="../../public/down-arrow.svg">
      <img :class="accordion !== 1 ? 'block' : 'hidden'" src="../../public/right.svg">
    </div>
		<div class="overflow-hidden bg-white" :class="{ 'h-0': accordion !== 0 }">
			<div class="sm:w-full md:w-7/12 lg:w-7/12 bg-white rounded-r-[10px] p-8" id="faq1_c">
						<p class="text-xl leading-9 font-semibold mb-7">
							Why should I pick ERPNext over other ERP products?
						</p>
						<p class="text-base mb-7">
							ERPNext is an open-source low-code platform with
							various modules to cater to diverse industries and
							their needs.
						</p>
						<p class="text-base font-semibold">
							Here are out-of-the-box benefits of the ERPNext
							platform -
						</p>
						<div class="flex items-center gap-2 ml-2">
							<div class="bg-gradient-to-r from-[#D4EAFF] to-[#3E96F4] rounded-full h-2.5 w-2.5">
							</div>
							<p class="text-base leading-7">
								Streamlined operations and improved efficiency
							</p>
						</div>
						<div class="flex items-center gap-2 ml-2">
							<div class="bg-gradient-to-r from-[#D4EAFF] to-[#3E96F4] rounded-full h-2.5 w-2.5">
							</div>
							<p class="text-base leading-7">
								Centralized data management and accessibility
							</p>
						</div>
						<div class="flex items-center gap-2 ml-2">
							<div class="bg-gradient-to-r from-[#D4EAFF] to-[#3E96F4] rounded-full h-2.5 w-2.5">
							</div>
							<p class="text-base leading-7">
								Better decision-making through real-time
								insights
							</p>
						</div>
						<div class="flex items-center gap-2 ml-2">
							<div class="bg-gradient-to-r from-[#D4EAFF] to-[#3E96F4] rounded-full h-2.5 w-2.5">
							</div>
							<p class="text-base leading-7">
								Automation of repetitive tasks
							</p>
						</div>
						<div class="flex items-center gap-2 ml-2">
							<div class="bg-gradient-to-r from-[#D4EAFF] to-[#3E96F4] rounded-full h-2.5 w-2.5">
							</div>
							<p class="text-base leading-7">
								Enhanced customer service and satisfaction
							</p>
						</div>
					</div>
  		</div>
	</div>
 	<div class="bg-white rounded-2xl">
    <div class="flex justify-between p-5" @click="accordion = accordion == 2 ? 0 : 2">
    	<div class="cursor-pointer">How long does my implementation project usually take?</div>
      <img :class="accordion !== 2 ? 'block' : 'hidden'" src="../../public/down-arrow.svg">
      <img :class="accordion === 2 ? 'block' : 'hidden'" src="../../public/right.svg">
    </div>
		<div class="overflow-hidden bg-white" :class="{ 'h-0': accordion !== 2 }">
			<p class="p-3">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac hendrerit turpis. Etiam eu mattis tortor. Cras blandit sapien hendrerit libero tristique hendrerit. Curabitur tincidunt sollicitudin laoreet. Integer ultrices elementum tortor, quis dapibus tellus sodales quis. Nulla id elit vestibulum, blandit lorem at, rhoncus elit. Sed feugiat quam et sollicitudin pellentesque. Aliquam erat volutpat. Integer nec elementum odio, nec aliquam metus. Ut non mattis nunc.
			</p>
  		</div>
	</div>
 	<div class="bg-white rounded-2xl">
    <div class="flex justify-between p-5" @click="accordion = accordion == 3 ? 0 : 3">
    	<div class="cursor-pointer">Do you provide a free demo before getting started?</div>
      <img :class="accordion !== 3 ? 'block' : 'hidden'" src="../../public/down-arrow.svg">
      <img :class="accordion === 3 ? 'block' : 'hidden'" src="../../public/right.svg">
    </div>
		<div class="overflow-hidden bg-white" :class="{ 'h-0': accordion !== 3 }">
			<p class="p-3">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac hendrerit turpis. Etiam eu mattis tortor. Cras blandit sapien hendrerit libero tristique hendrerit. Curabitur tincidunt sollicitudin laoreet. Integer ultrices elementum tortor, quis dapibus tellus sodales quis. Nulla id elit vestibulum, blandit lorem at, rhoncus elit. Sed feugiat quam et sollicitudin pellentesque. Aliquam erat volutpat. Integer nec elementum odio, nec aliquam metus. Ut non mattis nunc.
			</p>
  		</div>
	</div>
  <div class="bg-white rounded-2xl">
    <div class="flex justify-between p-5" @click="accordion = accordion == 4 ? 0: 4">
    	<div class="cursor-pointer">What is your implementation process?</div>
      <img :class="accordion !== 4 ? 'block' : 'hidden'" src="../../public/down-arrow.svg">
      <img :class="accordion === 4 ? 'block' : 'hidden'" src="../../public/right.svg">
    </div>
		<div class="overflow-hidden bg-white" :class="{ 'h-0': accordion !== 4 }">
			<p class="p-3">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac hendrerit turpis. Etiam eu mattis tortor. Cras blandit sapien hendrerit libero tristique hendrerit. Curabitur tincidunt sollicitudin laoreet. Integer ultrices elementum tortor, quis dapibus tellus sodales quis. Nulla id elit vestibulum, blandit lorem at, rhoncus elit. Sed feugiat quam et sollicitudin pellentesque. Aliquam erat volutpat. Integer nec elementum odio, nec aliquam metus. Ut non mattis nunc.
			</p>
  		</div>
	</div>
</div>
` })}`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/test1.astro");

const $$file = "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/test1.astro";
const $$url = "/sanskar/test1";

export { $$Test1 as default, $$file as file, $$url as url };
