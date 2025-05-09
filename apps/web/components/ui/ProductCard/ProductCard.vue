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
          class="object-contain rounded-md aspect-square w-full min-h-[185px]"
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
        class="no-underline font-bold text-primary-500 mb-3 line-clamp-3 lg:min-h-[60px]"
        variant="secondary"
        data-testid="productcard-name"
      >
        {{ name }}
      </SfLink>

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
        <div class="availability text-xs relative flex items-center group">
          <div class="relative flex items-center">
            <SfIconCheckCircle
              :noClass="true"
              size="sm"
              :class="[
                'availability-' + product.variation.availability.id,
                product.variation.availability.id <= 4 ? 'text-success' : 'text-gray-400',
              ]"
            />
            <div
              class="absolute bottom-full left-0 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-xs"
            >
              {{ product.variation.availability.names.name }}
            </div>
          </div>
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
