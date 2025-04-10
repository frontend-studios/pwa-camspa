<template>
  <footer class="bg-gray md:mb-0" data-testid="footer" :class="simplifiedFooter ? 'mb-0' : 'mb-[58px]'">
    <div class="usp-footer">
      <ul class="max-w-screen-2xl mx-auto relative flex flex-row flex-wrap justify-between py-4">
        <li class="flex items-center text-white text-xs usp-item mb-3 md:mb-0 justify-center">
          <SfIconCheckCircle size="xs" class="mr-2" />Schneller Versand
        </li>
        <li class="flex items-center text-white text-xs usp-item mb-3 md:mb-0 justify-center">
          <SfIconCheckCircle size="xs" class="mr-2" />Große Auswahl
        </li>
        <li class="flex items-center text-white text-xs usp-item mb-3 md:mb-0 justify-center">
          <SfIconCheckCircle size="xs" class="mr-2" />Faire Preise
        </li>
        <li class="flex items-center text-white text-xs usp-item mb-3 md:mb-0 justify-center">
          <SfIconCheckCircle size="xs" class="mr-2" />Hohe Qualität
        </li>
        <li class="flex items-center text-white text-xs usp-item mb-3 md:mb-0 justify-center">
          <SfIconCheckCircle size="xs" class="mr-2" />Persönlicher Service
        </li>
      </ul>
    </div>

    <div class="bg-white w-full">
      <div
        class="max-w-screen-2xl mx-auto relative flex flex-row flex-wrap justify-between px-4 py-4 md:py-10 xl:py-28"
      >
        <div class="delivery lg:pl-0 mb-4 lg:mb-10 w-full">
          <p class="text-primary-500 font-bold text-lg">Wir versenden mit</p>
          <ul class="flex">
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dpd" class="mr-5" /></li>
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dhl" /></li>
          </ul>
        </div>
        <div class="payment lg:pl-0 w-full">
          <p class="text-primary-500 font-bold text-lg">Bequem bezahlen mit</p>
          <ul class="flex flex-wrap">
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dpd" class="mr-5" /></li>
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dpd" class="mr-5" /></li>
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dpd" class="mr-5" /></li>
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dpd" class="mr-5" /></li>
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dpd" class="mr-5" /></li>
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dpd" class="mr-5" /></li>
            <li class="flex item mb-2"><img src="https://placehold.co/100x50" alt="dhl" /></li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="xl:max-w-[50%] mx-auto flex flex-wrap justify-around md:justify-between px-4 pt-4 md:pt-14 lg:pt-28 pb-4"
      data-testid="section-top"
    >
      <a href="#" class="m-0 font-bold text-xs">Kontakt</a>
      <a href="#" class="m-0 font-bold text-xs">Datenschutz</a>
      <a href="#" class="m-0 font-bold text-xs">AGB</a>
      <a href="#" class="m-0 font-bold text-xs">Impressum</a>
      <a href="#" class="m-0 font-bold text-xs">Zahlungsarten</a>
      <a href="#" class="m-0 font-bold text-xs">Versand</a>
      <a href="#" class="m-0 font-bold text-xs">Widerrufsrecht</a>
      <a href="#" class="m-0 font-bold text-xs">Hilfe</a>
    </div>

    <div class="copy text-center text-xs text-gray-500 pb-4 md:pb-14 lg:pb-28">
      <p>Copyright © 2025 Pegaso Marine Handel und Service GmbH</p>
      <p>
        Alle Preise verstehen sich inkl. MwSt. Alle Angebote sind freibleibend. Irrtümer, Druckfehler und
        Preisänderungen vorbehalten
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SfLink, SfListItem, SfIconCheckCircle } from '@storefront-ui/vue';
import { categories } from '~/mocks';
import type { FooterProps } from './types';

const storename: string = useRuntimeConfig().public.storename;

const companyName: string = `© ${storename} ${new Date().getFullYear()}`;

const { simplifiedFooter = false } = defineProps<FooterProps>();

const localePath = useLocalePath();
const NuxtLink = resolveComponent('NuxtLink');
</script>
