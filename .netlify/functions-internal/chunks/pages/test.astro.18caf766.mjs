/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate } from '../astro.88467b2c.mjs';
import 'html-escaper';
/* empty css                          */import 'cookie';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import 'path-to-regexp';
import 'mime';
import 'string-width';

const $$Astro = createAstro("https://Pithiya-Nilesh.github.io");
const $$Test = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Test;
  return renderTemplate`<!-- 
<div class="slideshow">
    <img class="slide" src="../../public/Images/project-manager.svg" alt="Slide 1" />
    <img class="slide" src="../../public/Images/project-manager.svg" alt="Slide 2" />
    <img class="slide" src="../../public/Images/customer.svg" alt="Slide 3" />
</div>
<button id="preBtn">Pre Slide</button>
<button id="nextBtn">Next Slide</button> --><!-- <section
            class="mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:mt-40 md:mt-40 mt-10"
        >
            <div class="md:text-center sm:text-left">
                <h2
                    class="text-4xl text-[#31393C] leading-[3rem] font-semibold"
                >
                    ERPNext is simplifying<br />
                    the manufacturing industry at the core!
                </h2>
            </div>
            <div
                class="grid grid-cols-5 gap-4 text-[#31393C] font-semibold mt-10  text-left justify-items-center items-center"
            >
            <div></div>
                <div
                    class="bg-[#FDFAF4] rounded-[10px] h-14 w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Dashboard
                </div>
                <div
                    class="bg-[#FCFDFD] rounded-[10px] h-14 w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Security
                </div>
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-14 w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Helpdesk
                </div>
            </div>
            <div
                class="grid grid-cols-6 gap-4 text-[#31393C] font-semibold text-center justify-items-center items-center"
            >
                <div
                    class="mt-10 bg-[#F8FBFE] rounded-[10px] h-[4.5rem]  px-7 border border-[#E9EEF3] flex justify-center items-center"
                >
                    Payment <br /> Gateway
                </div>
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-[4.5rem] px-7 border border-[#E9EEF3] flex justify-center items-center"
                >
                    Purchase
                </div>
                <div
                    class="bg-[#FCFDFD] rounded-[10px] h-[4.5rem]  px-7 border border-[#E9EEF3] flex justify-center items-center"
                >
                    Quality <br /> Control
                </div>
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-[4.5rem] px-7 border border-[#E9EEF3] flex justify-center items-center"
                >
                    Distribution
                </div>
                <div
                    class="bg-[#FDFAF4] rounded-[10px] h-[4.5rem] px-7 border border-[#E9EEF3] flex justify-center items-center"
                >
                    Capacity <br /> Planning
                </div>
                <div
                    class="mt-10 bg-[#FCFDFD] rounded-[10px] h-[4.5rem] px-5 border border-[#E9EEF3] flex justify-center items-center"
                >
                    Notifications
                </div>
            </div>
            <div
                class="grid grid-cols-5 gap-4 text-[#31393C] font-semibold mx-20 text-center justify-items-center items-center"
            >
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-[4.5rem] w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Material, Resource & Planning
                </div>
                <div
                    class="bg-[#FDFAF4] rounded-[10px] h-[6rem] w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Manufacturing BOM, Planning & Forcasting
                </div>
                <div
                    class="bg-[#3D96F5] rounded-[10px] h-[6.875rem] w-[11.5rem] border border-white justify-center items-center flex flex-wrap text-white"
                >
                    <img src="../../public/Images/erpnext.png" />Enterprise
                    Manufacturing
                </div>
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-[6rem] w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Batched <br /> Inventory
                </div>
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-[4.5rem] w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Asset <br /> Management
                </div>
            </div>
            <div
                class="grid grid-cols-6 gap-4 text-[#31393C] font-semibold mx-10 text-center justify-items-center items-center"
            >
                <div
                    class="mb-10 bg-[#F8FBFE] rounded-[10px] h-[4.5rem] w-[7.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Multilingual
                </div>
                <div
                    class="bg-[#FCFDFD] rounded-[10px] h-[4.5rem] w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Workflow
                </div>
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-[4.5rem] w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Project <br /> Management
                </div>
                <div
                    class="bg-[#FCFDFD] rounded-[10px] h-[4.5rem] w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    HR and <br /> Payroll
                </div>
                <div
                    class="bg-[#FDFAF4] rounded-[10px] h-[4.5rem] w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    CRM
                </div>
                <div
                    class="mb-10 bg-[#F8FBFE] rounded-[10px] h-[4.5rem] w-[7.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Training
                </div>
            </div>
            <div
                class="grid grid-cols-3 gap-4 text-[#31393C] font-semibold mx-72 text-left justify-items-center items-center"
            >
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-14 w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Reports
                </div>
                <div
                    class="bg-[#FDFAF4] rounded-[10px] h-14 w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Billing
                </div>
                <div
                    class="bg-[#F8FBFE] rounded-[10px] h-14 w-[9.5rem] border border-[#E9EEF3] flex justify-center items-center"
                >
                    Accounting
                </div>
            </div>
        </section> --><!-- <section class="flex h-[calc(100vh-10vh)] relative flex-wrap items-center">
            <div class="md:absolute right-0 w-7/12">
                <div class=" overflow-x-scroll custom-scrollbar">
                    <div class="flex gap-7">
                        <div
							class=" flex-shrink-0 bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg w-64 h-64 mr-10"
						>
							<img src="../../public/Images/calender.svg" />
							<p
								class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
							>
								12+
							</p>
							<p class="text-[#31393C] font-semibold">
								Years of Serving
							</p>
						</div>
                        <div
                        class=" flex-shrink-0 bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg w-64 h-64 mr-10"
                    >
                        <img src="../../public/Images/dollar.svg" />
                        <p
                            class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
                        >
                            35%
                        </p>
                        <p class="text-[#31393C] font-semibold">
                            Client cost savings
                        </p>
                    </div>
                    <div
                        class=" flex-shrink-0 bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg w-64 h-64 mr-10"
                    >
                        <img src="../../public/Images/time.svg" />
                        <p
                            class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
                        >
                            20%
                        </p>
                        <p class="text-[#31393C] font-semibold">
                            Faster Time to Market
                        </p>
                    </div>
                    <div
                        class=" flex-shrink-0 bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg w-64 h-64 mr-10"
                    >
                        <img src="../../public/Images/rocket.svg" />
                        <p
                            class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
                        >
                            45%
                        </p>
                        <p class="text-[#31393C] font-semibold">
                            Boost in Overall Business Efficiency
                        </p>
                    </div>
                    </div>
                    
                </div>
            </div>
            
            <div class="mx-5 md:max-w-7xl md:mx-auto md:px-24 flex container">
                <div class="w-3/12">
                    <h1 class="text-[3.5rem] text-[#31393C] font-semibold leading-[4rem]">
                        Let our numbers do the talking!
                    </h1>
                </div>
            </div>
        </section> --><!-- 
        <section
    class="hidden lg:flex h-[calc(100vh-10vh)] relative flex-wrap items-center"
>

    <div class="absolute right-0 w-7/12">

        <div class="grow flex gap-5 overflow-x-scroll custom-scrollbar">

        <div
            class="bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg mr-10 w-64"
        >
            <img src="../../public/Images/calender.svg" />
            <p
                class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
            >
                12+
            </p>
            <p class="text-[#31393C] font-semibold">Years of Serving</p>
        </div>
        <div
            class="bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg mr-10 w-64"
        >
            <img src="../../public/Images/calender.svg" />
            <p
                class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
            >
                12+
            </p>
            <p class="text-[#31393C] font-semibold">Years of Serving</p>
        </div>
        <div
            class="bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg mr-10 w-64"
        >
            <img src="../../public/Images/calender.svg" />
            <p
                class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
            >
                12+
            </p>
            <p class="text-[#31393C] font-semibold">Years of Serving</p>
        </div>
        <div
            class="bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg mr-10 w-64"
        >
            <img src="../../public/Images/calender.svg" />
            <p
                class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
            >
                12+
            </p>
            <p class="text-[#31393C] font-semibold">Years of Serving</p>
        </div>
        <div
            class="bg-gradient-to-r from-[#9FCEFF] to-[#E7F2FF] p-5 rounded-[10px] shadow drop-shadow-lg mr-10 w-64"
        >
            <img src="../../public/Images/calender.svg" />
            <p
                class="mt-14 text-[#31393C] text-[4rem] leading-[4.75rem] font-bold"
            >
                12+
            </p>
            <p class="text-[#31393C] font-semibold">Years of Serving</p>
        </div>


        </div>






        
    </div>












    <div class="mx-5 md:max-w-7xl md:mx-auto md:px-24 flex container">
        <div class="w-3/12">
            <h1
                class="text-[3.5rem] text-[#31393C] font-semibold leading-[4rem]"
            >
                Let our numbers do the talking!
            </h1>
        </div>
    </div>
</section> -->

`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/test.astro");

const $$file = "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/test.astro";
const $$url = "/sanskar/test";

export { $$Test as default, $$file as file, $$url as url };
