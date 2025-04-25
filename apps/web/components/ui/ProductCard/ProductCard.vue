<template>
  <div class="cmp-product bg-white hover:shadow-lg flex flex-col" data-testid="product-card">
    <div class="relative overflow-hidden mx-auto">
      <UiBadges
        :use-tags="useTagsOnCategoryPage"
        :class="['absolute', isFromWishlist ? 'mx-2' : 'm-2']"
        :product="product"
        :use-availability="isFromWishlist"
      />

      <SfLink
        :tag="NuxtLink"
        rel="preload"
        :to="productPath"
        :class="{ 'size-48': isFromSlider }"
        as="image"
        class="flex items-center justify-center"
      >
        <NuxtImg
          :src="imageUrl"
          :alt="imageAlt"
          :title="imageTitle"
          :loading="lazy && !priority ? 'lazy' : 'eager'"
          :fetchpriority="priority ? 'high' : 'auto'"
          :preload="priority || false"
          :width="getWidth()"
          :height="getHeight()"
          class="object-contain rounded-md aspect-square w-full"
          data-testid="image-slot"
        />
      </SfLink>

      <slot name="wishlistButton">
        <WishlistButton
          square
          class="hidden absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
          :product="product"
        />
      </slot>
    </div>
    <div class="p-2 typography-text-sm flex flex-col flex-auto">
      <SfLink
        :tag="NuxtLink"
        :to="productPath"
        class="no-underline font-bold text-primary-500 mb-3 line-clamp-3"
        variant="secondary"
        data-testid="productcard-name"
      >
        {{ name }}
      </SfLink>
      <div
        v-if="(ratingCount ?? 0) > 0"
        class="flex items-center pt-1 gap-1"
        :class="{ 'mb-2': !productGetters.getShortDescription(product) }"
      >
        <SfRating size="xs" :half-increment="true" :value="rating ?? 0" :max="5" />
        <SfCounter size="xs">{{ ratingCount }}</SfCounter>
      </div>

      <div
        v-if="productGetters.getShortDescription(product)"
        class="block py-2 font-normal typography-text-xs text-neutral-700 text-justify whitespace-pre-line break-words"
      >
        <div class="line-clamp-3" v-html="productGetters.getShortDescription(product)" />
      </div>
      <LowestPrice :product="product" />
      <div v-if="showBasePrice" class="mb-2">
        <BasePriceInLine :base-price="basePrice" :unit-content="unitContent" :unit-name="unitName" />
      </div>
      <div class="flex justify-between flex-row items-end">
        <div class="availability">
          <p class="text-xs relative flex items-center">
            <SfIconCheckCircle
              class="mr-1"
              size="sm"
              :class="[
                'availability-' + product.variation.availability.id,
                { 'text-success': product.variation.availability.id === 1 },
                { 'text-yellow-500': product.variation.availability.id === 2 },
                { 'text-orange-500': product.variation.availability.id === 3 },
                { 'text-red-500': product.variation.availability.id === 4 },
                { 'text-black': product.variation.availability.id === 5 },
              ]"
            />
            <span class="hidden md:inline text-secondary-500 text-xs font-medium">
              {{ product.variation.availability.names.name }}
            </span>
          </p>
        </div>
        <div class="flex flex-col-reverse items-end">
          <span class="block font-bold text-lg leading-4" data-testid="product-card-vertical-price">
            <span v-if="!productGetters.canBeAddedToCartFromCategoryPage(product)" class="mr-1">
              {{ t('account.ordersAndReturns.orderDetails.priceFrom') }}
            </span>
            <span>{{ n(price, 'currency') }}</span>
          </span>
          <span v-if="crossedPrice" class="typography-text-sm text-editor-danger line-through">
            {{ n(crossedPrice, 'currency') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import {
  SfLink,
  SfIconShoppingCart,
  SfLoaderCircular,
  SfRating,
  SfCounter,
  SfIconCheckCircle,
} from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
import { defaults } from '~/composables';

const localePath = useLocalePath();
const { t, n } = useI18n();
const {
  product,
  name,
  imageUrl,
  imageAlt = '',
  imageTitle,
  imageWidth,
  imageHeight,
  rating,
  ratingCount,
  priority,
  lazy = true,
  unitContent,
  unitName,
  basePrice,
  showBasePrice,
  isFromWishlist = false,
  isFromSlider = false,
} = defineProps<ProductCardProps>();

const { openQuickCheckout } = useQuickCheckout();
const { addToCart } = useCart();
const { price, crossedPrice } = useProductPrice(product);
const { send } = useNotification();
const loading = ref(false);
const config = useRuntimeConfig();
const useTagsOnCategoryPage = config.public.useTagsOnCategoryPage;

const productPath = computed(() =>
  localePath(`/${productGetters.getUrlPath(product)}_${productGetters.getItemId(product)}`),
);

const getWidth = () => {
  if (imageWidth && imageWidth > 0 && imageUrl.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageWidth;
  }
  return '';
};
const getHeight = () => {
  if (imageHeight && imageHeight > 0 && imageUrl.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageHeight;
  }
  return '';
};

const addWithLoader = async (productId: number, quickCheckout = true) => {
  loading.value = true;

  try {
    await addToCart({
      productId: productId,
      quantity: 1,
    });
    if (quickCheckout) {
      openQuickCheckout(product, 1);
    } else {
      send({ message: t('addedToCart'), type: 'positive' });
    }
  } finally {
    loading.value = false;
  }
};

const NuxtLink = resolveComponent('NuxtLink');
</script>
