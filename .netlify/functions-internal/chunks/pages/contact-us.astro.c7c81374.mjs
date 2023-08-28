/* empty css                                                                        */import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../astro.890e48a2.mjs';
import 'html-escaper';
import { $ as $$Image, a as $$Layout } from './about.astro.735425c2.mjs';
/* empty css                           *//* empty css                                */import 'cookie';
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
const contact_insta = {"src":"/_astro/contact_insta.59f42360.svg","width":16,"height":18,"format":"svg"};

const contact_fb = {"src":"/_astro/contact_fb.94846a19.svg","width":11,"height":18,"format":"svg"};

const contact_link = {"src":"/_astro/contact_link.18b17f60.svg","width":16,"height":18,"format":"svg"};

const contact_mail = {"src":"/_astro/contact_mail.05672675.svg","width":19,"height":15,"format":"svg"};

const contact_phone = {"src":"/_astro/contact_phone.fbfb69ba.svg","width":19,"height":20,"format":"svg"};

const contact_map = {"src":"/_astro/contact_map.4393675c.svg","width":15,"height":20,"format":"svg"};

const $$Astro = createAstro();
const $$ContactUs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContactUs;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact Us", ",": true, "keyword": "", ",": true, "description": "", ",": true, "canonical_href": "https://astro.sanskartechnolab.com/contact-us", "class": "astro-5C24FMMT" }, { "default": ($$result2) => renderTemplate`
${maybeRenderHead()}<section class="banner bg-cover bg-no-repeat h-[calc(100vh-10vh)] flex items-center astro-5C24FMMT">
      <div class="md:max-w-7xl md:mx-auto md:px-24 lg:px-4 w-full lg:w-7/12 px-5 astro-5C24FMMT">
        <div class="bg-white w-full lg:w-7/12 form-padding lg:p-7 astro-5C24FMMT">
           <form id="contact_form" class="grid gap-3 md:gap-3 lg:gap-5 astro-5C24FMMT">
        <h1 class="text-[#31393C] text-2xl md:text-3xl lg:text-4xl astro-5C24FMMT">
          Get in Touch
        </h1>
        <div class="text-[#333333] grid gap-3 md:gap-3 lg:gap-5 astro-5C24FMMT">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-3 lg:gap-5 astro-5C24FMMT">
            <input class="rounded-[3px] border border-[#D9D9D9] text-[#333333] astro-5C24FMMT" type="text" placeholder="First Name*" name="first_name">
            <input class="rounded-[3px] border border-[#D9D9D9] text-[#333333] astro-5C24FMMT" type="text" placeholder="Last Name*" name="last_name">
          </div>
          <input class="rounded-[3px] border border-[#D9D9D9] text-[#333333] astro-5C24FMMT" type="email" placeholder="Email*" name="email">
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-3 lg:gap-5 astro-5C24FMMT">
             <select id="country" class="rounded-[3px] pl-2 h-[2.5rem] border border-[#D9D9D9] text-[#333333] astro-5C24FMMT" name="country" style="height: 40px;">
                <option value="" class="astro-5C24FMMT">Select a country</option>
                <option value="Afghanistan" class="astro-5C24FMMT">Afghanistan</option>
                <option value="Albania" class="astro-5C24FMMT">Albania</option>
                <option value="Algeria" class="astro-5C24FMMT">Algeria</option>
                <option value="Andorra" class="astro-5C24FMMT">Andorra</option>
                <option value="Angola" class="astro-5C24FMMT">Angola</option>
                <option value="Antigua and Barbuda" class="astro-5C24FMMT">Antigua and Barbuda</option>
                <option value="Argentina" class="astro-5C24FMMT">Argentina</option>
                <option value="Armenia" class="astro-5C24FMMT">Armenia</option>
                <option value="Australia" class="astro-5C24FMMT">Australia</option>
                <option value="Austria" class="astro-5C24FMMT">Austria</option>
                <option value="Azerbaijan" class="astro-5C24FMMT">Azerbaijan</option>
                <option value="Bahamas" class="astro-5C24FMMT">Bahamas</option>
                <option value="Bahrain" class="astro-5C24FMMT">Bahrain</option>
                <option value="Bangladesh" class="astro-5C24FMMT">Bangladesh</option>
                <option value="Barbados" class="astro-5C24FMMT">Barbados</option>
                <option value="Belarus" class="astro-5C24FMMT">Belarus</option>
                <option value="Belgium" class="astro-5C24FMMT">Belgium</option>
                <option value="Belize" class="astro-5C24FMMT">Belize</option>
                <option value="Benin" class="astro-5C24FMMT">Benin</option>
                <option value="Bhutan" class="astro-5C24FMMT">Bhutan</option>
                <option value="Bolivia" class="astro-5C24FMMT">Bolivia</option>
                <option value="Bosnia and Herzegovina" class="astro-5C24FMMT">Bosnia and Herzegovina</option>
                <option value="Botswana" class="astro-5C24FMMT">Botswana</option>
                <option value="Brazil" class="astro-5C24FMMT">Brazil</option>
                <option value="Brunei" class="astro-5C24FMMT">Brunei</option>
                <option value="Bulgaria" class="astro-5C24FMMT">Bulgaria</option>
                <option value="Burkina Faso" class="astro-5C24FMMT">Burkina Faso</option>
                <option value="Burundi" class="astro-5C24FMMT">Burundi</option>
                <option value="Cabo Verde" class="astro-5C24FMMT">Cabo Verde</option>
                <option value="Cambodia" class="astro-5C24FMMT">Cambodia</option>
                <option value="Cameroon" class="astro-5C24FMMT">Cameroon</option>
                <option value="Canada" class="astro-5C24FMMT">Canada</option>
                <option value="Central African Republic" class="astro-5C24FMMT">Central African Republic</option>
                <option value="Chad" class="astro-5C24FMMT">Chad</option>
                <option value="Chile" class="astro-5C24FMMT">Chile</option>
                <option value="China" class="astro-5C24FMMT">China</option>
                <option value="Colombia" class="astro-5C24FMMT">Colombia</option>
                <option value="Comoros" class="astro-5C24FMMT">Comoros</option>
                <option value="Congo" class="astro-5C24FMMT">Congo</option>
                <option value="Costa Rica" class="astro-5C24FMMT">Costa Rica</option>
                <option value="Croatia" class="astro-5C24FMMT">Croatia</option>
                <option value="Cuba" class="astro-5C24FMMT">Cuba</option>
                <option value="Cyprus" class="astro-5C24FMMT">Cyprus</option>
                <option value="Czech Republic" class="astro-5C24FMMT">Czech Republic</option>
                <option value="Democratic Republic of the Congo" class="astro-5C24FMMT">Democratic Republic of the Congo</option>
                <option value="Denmark" class="astro-5C24FMMT">Denmark</option>
                <option value="Djibouti" class="astro-5C24FMMT">Djibouti</option>
                <option value="Dominica" class="astro-5C24FMMT">Dominica</option>
                <option value="Dominican Republic" class="astro-5C24FMMT">Dominican Republic</option>
                <option value="Ecuador" class="astro-5C24FMMT">Ecuador</option>
                <option value="Egypt" class="astro-5C24FMMT">Egypt</option>
                <option value="El Salvador" class="astro-5C24FMMT">El Salvador</option>
                <option value="Equatorial Guinea" class="astro-5C24FMMT">Equatorial Guinea</option>
                <option value="Eritrea" class="astro-5C24FMMT">Eritrea</option>
                <option value="Estonia" class="astro-5C24FMMT">Estonia</option>
                <option value="Eswatini" class="astro-5C24FMMT">Eswatini</option>
                <option value="Ethiopia" class="astro-5C24FMMT">Ethiopia</option>
                <option value="Fiji" class="astro-5C24FMMT">Fiji</option>
                <option value="Finland" class="astro-5C24FMMT">Finland</option>
                <option value="France" class="astro-5C24FMMT">France</option>
                <option value="Gabon" class="astro-5C24FMMT">Gabon</option>
                <option value="Gambia" class="astro-5C24FMMT">Gambia</option>
                <option value="Georgia" class="astro-5C24FMMT">Georgia</option>
                <option value="Germany" class="astro-5C24FMMT">Germany</option>
                <option value="Ghana" class="astro-5C24FMMT">Ghana</option>
                <option value="Greece" class="astro-5C24FMMT">Greece</option>
                <option value="Grenada" class="astro-5C24FMMT">Grenada</option>
                <option value="Guatemala" class="astro-5C24FMMT">Guatemala</option>
                <option value="Guinea" class="astro-5C24FMMT">Guinea</option>
                <option value="Guinea-Bissau" class="astro-5C24FMMT">Guinea-Bissau</option>
                <option value="Guyana" class="astro-5C24FMMT">Guyana</option>
                <option value="Haiti" class="astro-5C24FMMT">Haiti</option>
                <option value="Holy See" class="astro-5C24FMMT">Holy See</option>
                <option value="Honduras" class="astro-5C24FMMT">Honduras</option>
                <option value="Hungary" class="astro-5C24FMMT">Hungary</option>
                <option value="Iceland" class="astro-5C24FMMT">Iceland</option>
                <option value="India" class="astro-5C24FMMT">India</option>
                <option value="Indonesia" class="astro-5C24FMMT">Indonesia</option>
                <option value="Iran" class="astro-5C24FMMT">Iran</option>
                <option value="Iraq" class="astro-5C24FMMT">Iraq</option>
                <option value="Ireland" class="astro-5C24FMMT">Ireland</option>
                <option value="Israel" class="astro-5C24FMMT">Israel</option>
                <option value="Italy" class="astro-5C24FMMT">Italy</option>
                <option value="Jamaica" class="astro-5C24FMMT">Jamaica</option>
                <option value="Japan" class="astro-5C24FMMT">Japan</option>
                <option value="Jordan" class="astro-5C24FMMT">Jordan</option>
                <option value="Kazakhstan" class="astro-5C24FMMT">Kazakhstan</option>
                <option value="Kenya" class="astro-5C24FMMT">Kenya</option>
                <option value="Kiribati" class="astro-5C24FMMT">Kiribati</option>
                <option value="Kuwait" class="astro-5C24FMMT">Kuwait</option>
                <option value="Kyrgyzstan" class="astro-5C24FMMT">Kyrgyzstan</option>
                <option value="Laos" class="astro-5C24FMMT">Laos</option>
                <option value="Latvia" class="astro-5C24FMMT">Latvia</option>
                <option value="Lebanon" class="astro-5C24FMMT">Lebanon</option>
                <option value="Lesotho" class="astro-5C24FMMT">Lesotho</option>
                <option value="Liberia" class="astro-5C24FMMT">Liberia</option>
                <option value="Libya" class="astro-5C24FMMT">Libya</option>
                <option value="Liechtenstein" class="astro-5C24FMMT">Liechtenstein</option>
                <option value="Lithuania" class="astro-5C24FMMT">Lithuania</option>
                <option value="Luxembourg" class="astro-5C24FMMT">Luxembourg</option>
                <option value="Madagascar" class="astro-5C24FMMT">Madagascar</option>
                <option value="Malawi" class="astro-5C24FMMT">Malawi</option>
                <option value="Malaysia" class="astro-5C24FMMT">Malaysia</option>
                <option value="Maldives" class="astro-5C24FMMT">Maldives</option>
                <option value="Mali" class="astro-5C24FMMT">Mali</option>
                <option value="Malta" class="astro-5C24FMMT">Malta</option>
                <option value="Marshall Islands" class="astro-5C24FMMT">Marshall Islands</option>
                <option value="Mauritania" class="astro-5C24FMMT">Mauritania</option>
                <option value="Mauritius" class="astro-5C24FMMT">Mauritius</option>
                <option value="Mexico" class="astro-5C24FMMT">Mexico</option>
                <option value="Micronesia" class="astro-5C24FMMT">Micronesia</option>
                <option value="Moldova" class="astro-5C24FMMT">Moldova</option>
                <option value="Monaco" class="astro-5C24FMMT">Monaco</option>
                <option value="Mongolia" class="astro-5C24FMMT">Mongolia</option>
                <option value="Montenegro" class="astro-5C24FMMT">Montenegro</option>
                <option value="Morocco" class="astro-5C24FMMT">Morocco</option>
                <option value="Mozambique" class="astro-5C24FMMT">Mozambique</option>
                <option value="Myanmar" class="astro-5C24FMMT">Myanmar</option>
                <option value="Namibia" class="astro-5C24FMMT">Namibia</option>
                <option value="Nauru" class="astro-5C24FMMT">Nauru</option>
                <option value="Nepal" class="astro-5C24FMMT">Nepal</option>
                <option value="Netherlands" class="astro-5C24FMMT">Netherlands</option>
                <option value="New Zealand" class="astro-5C24FMMT">New Zealand</option>
                <option value="Nicaragua" class="astro-5C24FMMT">Nicaragua</option>
                <option value="Niger" class="astro-5C24FMMT">Niger</option>
                <option value="Nigeria" class="astro-5C24FMMT">Nigeria</option>
                <option value="North Korea" class="astro-5C24FMMT">North Korea</option>
                <option value="North Macedonia" class="astro-5C24FMMT">North Macedonia</option>
                <option value="Norway" class="astro-5C24FMMT">Norway</option>
                <option value="Oman" class="astro-5C24FMMT">Oman</option>
                <option value="Pakistan" class="astro-5C24FMMT">Pakistan</option>
                <option value="Palau" class="astro-5C24FMMT">Palau</option>
                <option value="Palestine" class="astro-5C24FMMT">Palestine</option>
                <option value="Panama" class="astro-5C24FMMT">Panama</option>
                <option value="Papua New Guinea" class="astro-5C24FMMT">Papua New Guinea</option>
                <option value="Paraguay" class="astro-5C24FMMT">Paraguay</option>
                <option value="Peru" class="astro-5C24FMMT">Peru</option>
                <option value="Philippines" class="astro-5C24FMMT">Philippines</option>
                <option value="Poland" class="astro-5C24FMMT">Poland</option>
                <option value="Portugal" class="astro-5C24FMMT">Portugal</option>
                <option value="Qatar" class="astro-5C24FMMT">Qatar</option>
                <option value="Romania" class="astro-5C24FMMT">Romania</option>
                <option value="Russia" class="astro-5C24FMMT">Russia</option>
                <option value="Rwanda" class="astro-5C24FMMT">Rwanda</option>
                <option value="Saint Kitts and Nevis" class="astro-5C24FMMT">Saint Kitts and Nevis</option>
                <option value="Saint Lucia" class="astro-5C24FMMT">Saint Lucia</option>
                <option value="Saint Vincent and the Grenadines" class="astro-5C24FMMT">Saint Vincent and the Grenadines</option>
                <option value="Samoa" class="astro-5C24FMMT">Samoa</option>
                <option value="San Marino" class="astro-5C24FMMT">San Marino</option>
                <option value="Sao Tome and Principe" class="astro-5C24FMMT">Sao Tome and Principe</option>
                <option value="Saudi Arabia" class="astro-5C24FMMT">Saudi Arabia</option>
                <option value="Senegal" class="astro-5C24FMMT">Senegal</option>
                <option value="Serbia" class="astro-5C24FMMT">Serbia</option>
                <option value="Seychelles" class="astro-5C24FMMT">Seychelles</option>
                <option value="Sierra Leone" class="astro-5C24FMMT">Sierra Leone</option>
                <option value="Singapore" class="astro-5C24FMMT">Singapore</option>
                <option value="Slovakia" class="astro-5C24FMMT">Slovakia</option>
                <option value="Slovenia" class="astro-5C24FMMT">Slovenia</option>
                <option value="Solomon Islands" class="astro-5C24FMMT">Solomon Islands</option>
                <option value="Somalia" class="astro-5C24FMMT">Somalia</option>
                <option value="South Africa" class="astro-5C24FMMT">South Africa</option>
                <option value="South Korea" class="astro-5C24FMMT">South Korea</option>
                <option value="South Sudan" class="astro-5C24FMMT">South Sudan</option>
                <option value="Spain" class="astro-5C24FMMT">Spain</option>
                <option value="Sri Lanka" class="astro-5C24FMMT">Sri Lanka</option>
                <option value="Sudan" class="astro-5C24FMMT">Sudan</option>
                <option value="Suriname" class="astro-5C24FMMT">Suriname</option>
                <option value="Switzerland" class="astro-5C24FMMT">Switzerland</option>
                <option value="Syria" class="astro-5C24FMMT">Syria</option>
                <option value="Taiwan" class="astro-5C24FMMT">Taiwan</option>
                <option value="Tajikistan" class="astro-5C24FMMT">Tajikistan</option>
                <option value="Tanzania" class="astro-5C24FMMT">Tanzania</option>
                <option value="Thailand" class="astro-5C24FMMT">Thailand</option>
                <option value="Timor-Leste" class="astro-5C24FMMT">Timor-Leste</option>
                <option value="Togo" class="astro-5C24FMMT">Togo</option>
                <option value="Tonga" class="astro-5C24FMMT">Tonga</option>
                <option value="Trinidad and Tobago" class="astro-5C24FMMT">Trinidad and Tobago</option>
                <option value="Tunisia" class="astro-5C24FMMT">Tunisia</option>
                <option value="Turkey" class="astro-5C24FMMT">Turkey</option>
                <option value="Turkmenistan" class="astro-5C24FMMT">Turkmenistan</option>
                <option value="Tuvalu" class="astro-5C24FMMT">Tuvalu</option>
                <option value="Uganda" class="astro-5C24FMMT">Uganda</option>
                <option value="Ukraine" class="astro-5C24FMMT">Ukraine</option>
                <option value="United Arab Emirates" class="astro-5C24FMMT">United Arab Emirates</option>
                <option value="United Kingdom" class="astro-5C24FMMT">United Kingdom</option>
                <option value="United States" class="astro-5C24FMMT">United States</option>
                <option value="Uruguay" class="astro-5C24FMMT">Uruguay</option>
                <option value="Uzbekistan" class="astro-5C24FMMT">Uzbekistan</option>
                <option value="Vanuatu" class="astro-5C24FMMT">Vanuatu</option>
                <option value="Venezuela" class="astro-5C24FMMT">Venezuela</option>
                <option value="Vietnam" class="astro-5C24FMMT">Vietnam</option>
                <option value="Yemen" class="astro-5C24FMMT">Yemen</option>
                <option value="Zambia" class="astro-5C24FMMT">Zambia</option>
                <option value="Zimbabwe" class="astro-5C24FMMT">Zimbabwe</option>
              </select>
            <input class="rounded-[3px] md:col-span-2 border border-[#D9D9D9] text-[#333333] astro-5C24FMMT" type="tel" name="phone" id="telephoneCode">
          </div>
          <textarea name="message" rows="4" cols="50" placeholder="Message" class="pl-3 pt-1 border border-[#D9D9D9] text-[#333333] astro-5C24FMMT"></textarea>
		  <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-3 lg:gap-5 astro-5C24FMMT">
              <!-- <div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div> -->
                <div class="astro-5C24FMMT">  
                    <input class="input-file rounded-[4px] flex flex-wrap bg-[#F0F0F0] astro-5C24FMMT" type="file" name="file" id="fileInput">
                    <p class="text-xs mt-2 astro-5C24FMMT">Allow Formats (.jpg |.pdf |.png |.docx |.txt)</p>
                </div>
              </div>
              <button class="w-24 bg-[#3E96F4] rounded text-white md:text-sm text-xs lg:text-base font-semibold p-2 px-5 astro-5C24FMMT">
                SUBMIT
              </button>
            </div>          
      </form>
        </div>
      </div>
    </section>

    <section class="mx-5 md:max-w-7xl md:mx-auto md:px-24 lg:px-0 mt-[6.25rem] md:mt-[6.25rem] lg:mt-[12.50rem] astro-5C24FMMT">
      <div class="flex flex-wrap  astro-5C24FMMT">
        <div class="w-full md:w-9/12 lg:w-9/12 astro-5C24FMMT">
          <p class="text-2xl md:text-3xl lg:text-4xl text-[#31393C] font-semibold mb-5 md:mb-7 lg:mb-10 astro-5C24FMMT">Our Offices</p>
          <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-0 astro-5C24FMMT">
            <div class="astro-5C24FMMT">
              <p class="text-lg md:text-xl lg:text-2xl text-[#31393C] mb-2 md:mb-3 lg:mb-4 astro-5C24FMMT">Ahmedabad</p>
              <div class="flex gap-3 items-start astro-5C24FMMT">
                ${renderComponent($$result2, "Image", $$Image, { "src": contact_map, "alt": "map", "class": "mt-1 astro-5C24FMMT" })}
                <p class="text-xs md:text-sm lg:text-base text-[#31393C] astro-5C24FMMT">
                  A-706, Privilon,<br class="astro-5C24FMMT">
                  Behind Iscon Temple,<br class="astro-5C24FMMT">
                  Iscon cross Road, SG Highway,<br class="astro-5C24FMMT">
                  Ahmedabad. (Gujarat-India)</p>
              </div>
            </div>
            <div class="astro-5C24FMMT">
              <p class="text-lg md:text-xl lg:text-2xl text-[#31393C] mb-2 md:mb-3 lg:mb-4 mt-5 md:mt-0 astro-5C24FMMT">Junagadh</p>
              <div class="flex gap-3 items-start astro-5C24FMMT">
                ${renderComponent($$result2, "Image", $$Image, { "src": contact_map, "alt": "map", "class": "mt-1 astro-5C24FMMT" })}
                <p class="text-xs md:text-sm lg:text-base text-[#31393C] astro-5C24FMMT">
                  4th Floor, Milestone Complex,<br class="astro-5C24FMMT">
                  Deep Nagar, Zanzarda Road, <br class="astro-5C24FMMT">
                  Junagadh. (Gujarat-India)</p>
              </div>
            </div>
          </div>
         <hr class="my-5  margin-right astro-5C24FMMT">
          <div class="flex flex-wrap justify-between astro-5C24FMMT">
            <div class="flex gap-2 md:gap-3 items-center astro-5C24FMMT">
              ${renderComponent($$result2, "Image", $$Image, { "src": contact_phone, "alt": "phone", "class": "astro-5C24FMMT" })}
              <p class="text-xs md:text-sm lg:text-base text-[#31393C] font-semibold astro-5C24FMMT"><a href="tel:+919558112081" class="astro-5C24FMMT">(+91) 95581 12081</a></p>
            </div>
            <div class="flex margin-right  gap-1 md:gap-3 lg:gap-5 astro-5C24FMMT">
              <a href="https://in.linkedin.com/company/sanskar-technolab-pvt-ltd" class="astro-5C24FMMT">${renderComponent($$result2, "Image", $$Image, { "class": "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 astro-5C24FMMT", "src": contact_link, "alt": "linkedin" })}</a>
              <a href="https://www.facebook.com/SanskarTechnolab/" class="astro-5C24FMMT">${renderComponent($$result2, "Image", $$Image, { "class": "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 astro-5C24FMMT", "src": contact_fb, "alt": "facebook" })}</a>
              <a href="https://www.instagram.com/sanskartechnolab/" class="astro-5C24FMMT">${renderComponent($$result2, "Image", $$Image, { "class": "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 astro-5C24FMMT", "src": contact_insta, "alt": "instagram" })}</a>
            </div>

          </div>
        </div>

        <div class="w-full md:w-3/12 lg:w-3/12 mt-10 md:mt-0 astro-5C24FMMT">
          <p class="text-2xl md:text-3xl lg:text-4xl text-[#31393C] font-semibold mb-5 md:mb-7 lg:mb-10 astro-5C24FMMT">Email Us</p>
          <div class="astro-5C24FMMT">
            <p class="text-lg md:text-xl lg:text-2xl text-[#31393C] mb-2 md:mb-3 lg:mb-4 astro-5C24FMMT">Business</p>
            <div class="flex gap-3 items-start astro-5C24FMMT">
              ${renderComponent($$result2, "Image", $$Image, { "src": contact_mail, "alt": "mail", "class": "mt-2 astro-5C24FMMT" })}
              <p class="mb-4 md:mb-6 lg:mb-8 grid text-xs md:text-sm lg:text-base text-[#31393C] font-semibold astro-5C24FMMT"><a href="mailto:info@sanskartechnolab.com" class="astro-5C24FMMT">info@sanskartechnolab.com</a> <a href="mailto:sales@sanskartechnolab.com" class="astro-5C24FMMT">sales@sanskartechnolab.com</a></p>
            </div>
            <p class="text-lg md:text-xl lg:text-2xl text-[#31393C] mb-2 md:mb-3 lg:mb-4 astro-5C24FMMT">Career</p>
            <div class="flex gap-3 items-center astro-5C24FMMT">
              ${renderComponent($$result2, "Image", $$Image, { "src": contact_mail, "alt": "mail", "class": "astro-5C24FMMT" })}
              <p class="text-xs md:text-sm lg:text-base text-[#31393C] font-semibold astro-5C24FMMT"><a href="mailto:career@sanskartechnolab.com" class="astro-5C24FMMT">career@sanskartechnolab.com</a></p>
            </div>
          </div>
        </div>

      </div>

      <p class="text-xs md:text-xs lg:text-sm text-[#31393C] mt-12 md:mt-14 lg:mt-16 astro-5C24FMMT">Disclaimer: All the names of third party Companies or third party software products mention in our website are only for information purpose and we do not say that we own or use or have tie up with this products or companies. If any company wishes to remove any name then contact us and we will surely comply with the authorise personals.</p>
    </section>

    <section class="bg-[#EBF5FF] p-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 justify-items-center gap-5 h-[28.75rem] mt-[6.25rem] md:mt-[6.25rem] lg:mt-[12.50rem] astro-5C24FMMT">
      <div class="mapouter astro-5C24FMMT"><div class="gmap_canvas astro-5C24FMMT"><iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=sanskar technolab ahmedabad&t=&z=14&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" class="astro-5C24FMMT"></iframe><a href="https://2yu.co" class="astro-5C24FMMT">2yu</a><br class="astro-5C24FMMT"><a href="https://embedgooglemap.2yu.co/" class="astro-5C24FMMT">html embed google map</a></div></div>
      <div class="mapouter astro-5C24FMMT"><div class="gmap_canvas astro-5C24FMMT"><iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=sanskar technolab junagadh&t=&z=14&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" class="astro-5C24FMMT"></iframe><a href="https://2yu.co" class="astro-5C24FMMT">2yu</a><br class="astro-5C24FMMT"><a href="https://embedgooglemap.2yu.co/" class="astro-5C24FMMT">html embed google map</a></div></div>
    </section>
  
  
` })}`;
}, "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/contact-us.astro", void 0);

const $$file = "/home/nilesh-pithiya/Astro/Astro/sanskar/src/pages/contact-us.astro";
const $$url = "/contact-us";

export { $$ContactUs as default, $$file as file, $$url as url };
