<template>
  <div class="fs-homepage bg-gray">
    <div class="max-w-screen-2xl mx-auto relative hero grid md:grid-cols-[2fr_1fr] mb-2 md:mb-0 gap-8">
      <a href="#" class="relative">
        <img
          src="https://cdn02.plentymarkets.com/6nqf4rd4jwp6/frontend/CAM/PWA/homepage/hero.png"
          alt="Qualität, Schutz & Komfort von Beginn an"
          class="w-full h-full object-cover"
        />
        <div class="overlay"></div>
        <div class="cat-wrapper absolute">
          <span class="text-white mb-0 block font-bold text-shadow text-xl md:text-3xl lg:text-4xl"
            >Qualität, Schutz & Komfort von Beginn an</span
          >
          <span class="text-white custom-font text-lg md:text-xl lg:text-2xl font-bold block lg:mb-7 text-shadow"
            >Babyprodukte mit Herz - Seit über 50 Jahren</span
          >
          <button
            href="/#"
            class="btn bg-white text-secondary-500 font-bold p-3 lg:p-5 mt-4 hover:text-white hover:bg-secondary-500 text-sm"
          >
            <span class="border-left">Jetzt den Modus (duo) entdecken</span>
          </button>
        </div>
      </a>

      <a href="#" class="relative">
        <img
          src="https://cdn02.plentymarkets.com/6nqf4rd4jwp6/frontend/CAM/PWA/homepage/cat1.png"
          alt="Hochstühle"
          class="w-full h-full object-cover"
        />
        <div class="overlay"></div>
        <div class="cat-wrapper absolute">
          <span class="text-white mb-0 block font-bold text-shadow text-xl md:text-3xl lg:text-4xl">Hochstühle</span>
          <span class="text-white custom-font text-lg md:text-xl lg:text-2xl font-bold block lg:mb-7 text-shadow"
            >Der erste Platz am Tisch</span
          >
          <button
            href="/#"
            class="btn bg-white text-secondary-500 font-bold p-3 lg:p-5 mt-4 hover:text-white hover:bg-secondary-500 text-sm"
          >
            <span class="border-left">Jetzt entdecken</span>
          </button>
        </div>
      </a>
    </div>
  </div>
  <div class="fs-homepage bg-white py-5 usps">
    <div class="max-w-screen-2xl mx-auto relative">
      <ul class="flex justify-around">
        <li class="flex flex-col items-center justify-center">
          <img src="https://placehold.co/75x75" alt="Beste Qualität aus Italien" class="" />
          <span class="text-primary-500 mb-0 block font-bold text-xs mt-2 text-center"
            >Beste Qualität <br />aus Italien</span
          >
        </li>
        <li class="flex flex-col items-center justify-center">
          <img src="https://placehold.co/75x75" alt="Geprüfte Sicherheit" class="" />
          <span class="text-primary-500 mb-0 block font-bold text-xs mt-2 text-center">Geprüfte <br />Sicherheit</span>
        </li>
        <li class="flex flex-col items-center justify-center">
          <img src="https://placehold.co/75x75" alt="10.000+ zufriedene Kunden" class="" />
          <span class="text-primary-500 mb-0 block font-bold text-xs mt-2 text-center"
            >10.000+ <br />zufriedene Kunden</span
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="fs-homepage bg-gray">
    <div class="max-w-screen-2xl mx-auto relative md:grid md:grid-cols-2 mb-2 md:mb-0 gap-8 items-center">
      <a href="#" class="relative">
        <img
          src="https://cdn02.plentymarkets.com/6nqf4rd4jwp6/frontend/CAM/PWA/homepage/cat2.png"
          alt="Kinderwagen"
          class="w-full h-full object-cover"
        />
        <div class="overlay"></div>
        <div class="cat-wrapper absolute">
          <span class="text-white mb-0 block font-bold text-shadow text-xl md:text-3xl lg:text-4xl">Kinderwagen</span>
          <span class="text-white custom-font text-lg md:text-xl lg:text-2xl font-bold block lg:mb-7 text-shadow"
            >Flexibel unterwegs – ab dem ersten Tag.</span
          >
        </div>
      </a>
      <div class="thumbs mt-5 md:mt-0">
        <p class="text-primary-500 text-3xl mb-2 block font-bold">Entdecken Sie unsere Kinderwagen</p>
        <RecommendedProducts :category-id="customProductsCategoryIdFirst" />
        <button
          href="/#"
          class="btn bg-white text-secondary-500 font-bold p-3 lg:p-5 mt-4 hover:text-white hover:bg-secondary-500 text-sm"
        >
          <span class="border-left">Alle Kinderwagen entdecken</span>
        </button>
      </div>
    </div>
    <NuxtLazyHydrate when-visible>
      <div class="max-w-screen-2xl mx-auto relative mb-5 md:my-8">
        <picture>
          <source srcset="https://placehold.co/1366x300" media="(min-width: 768px)" />
          <img
            src="https://placehold.co/550x550"
            alt="Italienische Verarbeitung und Produktion"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="overlay"></div>
        </picture>
      </div>
    </NuxtLazyHydrate>
    <NuxtLazyHydrate when-visible>
      <div class="max-w-screen-2xl mx-auto relative grid md:grid-cols-[1fr_1fr] mb-5 md:my-8 gap-8">
        <a href="#" class="relative">
          <img
            src="https://cdn02.plentymarkets.com/6nqf4rd4jwp6/frontend/CAM/PWA/homepage/cat3.png"
            alt="Traumhafte Nächte"
            class="w-full h-full object-cover"
          />
          <div class="overlay"></div>
          <div class="cat-wrapper absolute">
            <span class="text-white mb-0 block font-bold text-shadow text-xl md:text-3xl lg:text-4xl"
              >Traumhafte Nächte</span
            >
            <span class="text-white custom-font text-lg md:text-xl lg:text-2xl font-bold block lg:mb-7 text-shadow"
              >Betten & Zubehör – Alles für süße Träume</span
            >
            <button
              href="/#"
              class="btn bg-white text-secondary-500 font-bold p-3 lg:p-5 mt-4 hover:text-white hover:bg-secondary-500 text-sm"
            >
              <span class="border-left">Zu den Betten</span>
            </button>
          </div>
        </a>

        <a href="#" class="relative">
          <img
            src="https://cdn02.plentymarkets.com/6nqf4rd4jwp6/frontend/CAM/PWA/homepage/cat4.png"
            alt="Bade-Wickel-Kombinationen"
            class="w-full h-full object-cover"
          />
          <div class="overlay"></div>
          <div class="cat-wrapper absolute">
            <span class="text-white mb-0 block font-bold text-shadow text-xl md:text-3xl lg:text-4xl">
              Sanft baden, sicher wickeln</span
            >
            <span class="text-white custom-font text-lg md:text-xl lg:text-2xl font-bold block lg:mb-7 text-shadow"
              >Bade-Wickel-Kombinationen</span
            >
            <button
              href="/#"
              class="btn bg-white text-secondary-500 font-bold p-3 lg:p-5 mt-4 hover:text-white hover:bg-secondary-500 text-sm"
            >
              <span class="border-left">Jetzt entdecken</span>
            </button>
          </div>
        </a>
      </div>
      <div class="max-w-screen-2xl mx-auto relative thumbs mb-5 md:my-8">
        <div class="flex justify-between items-center mb-3">
          <p class="text-primary-500 text-3xl block font-bold">Topseller</p>
          <button
            href="/#"
            class="btn bg-white text-secondary-500 font-bold p-3 lg:p-5 mt-4 hover:text-white hover:bg-secondary-500 text-sm"
          >
            <span class="border-left">Alle Topseller auf einen Blick!</span>
          </button>
        </div>
        <RecommendedProducts :category-id="customProductsCategoryIdSecond" />
      </div>
      <div class="max-w-screen-2xl mx-auto relative md:grid md:grid-cols-2 gap-8 items-center pb-5 md:py-8">
        <a href="#" class="relative">
          <img
            src="https://cdn02.plentymarkets.com/6nqf4rd4jwp6/frontend/CAM/PWA/homepage/cat5.png"
            alt="Autositze"
            class="w-full h-full object-cover"
          />
          <div class="overlay"></div>
          <div class="cat-wrapper absolute">
            <span class="text-white mb-0 block font-bold text-shadow text-xl md:text-3xl lg:text-4xl">Autositze</span>
            <span class="text-white custom-font text-lg md:text-xl lg:text-2xl font-bold block lg:mb-7 text-shadow"
              >Entdecken Sie unsere Autositze</span
            >
          </div>
        </a>
        <div class="thumbs mt-5 md:mt-0">
          <p class="text-primary-500 text-3xl mb-2 block font-bold">Entdecken Sie unsere Autositze</p>
          <RecommendedProducts :category-id="customProductsCategoryIdThird" />
          <button
            href="/#"
            class="btn bg-white text-secondary-500 font-bold p-3 lg:p-5 mt-4 hover:text-white hover:bg-secondary-500 text-sm"
          >
            <span class="border-left">Alle Autositze entdecken</span>
          </button>
        </div>
      </div>
    </NuxtLazyHydrate>
  </div>
</template>
<script lang="ts" setup>
const { isClicked, clickedBlockIndex, isTablet, blockHasData, tabletEdit, changeBlockPosition } = useBlockManager();

const { t } = useI18n();
const { settingsIsDirty } = useSiteConfiguration();

const { data, getBlocks } = useCategoryTemplate();

const dataIsEmpty = computed(() => data.value.length === 0);

const { isEditingEnabled, disableActions } = useEditor();
const { getRobots, setRobotForStaticPage } = useRobots();

const { setPageMeta } = usePageMeta();

const icon = 'home';
setPageMeta(t('homepage.title'), icon);

await getBlocks('index', 'immutable');

onMounted(() => {
  isEditingEnabled.value = false;
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

const hasUnsavedChanges = () => {
  return !isEditingEnabled.value && !settingsIsDirty.value;
};

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (hasUnsavedChanges()) return;
  event.preventDefault();
};

getRobots();
setRobotForStaticPage('Homepage');

// Adding Items from specific Cat START
const { data: categoryTree } = useCategoryTree();
const customProductsCategoryIdFirst = ref('');
const customProductsCategoryIdSecond = ref('');
const customProductsCategoryIdThird = ref('');

watch(
  () => categoryTree.value,
  async () => {
    const categoryIdFirst = 304;
    const categoryIdSecond = 314;
    const categoryIdThird = 310;
    customProductsCategoryIdFirst.value = categoryIdFirst.toString();
    customProductsCategoryIdSecond.value = categoryIdSecond.toString();
    customProductsCategoryIdThird.value = categoryIdThird.toString();
  },
  { immediate: true },
);
// Adding Items from specific Cat ENDE
</script>
