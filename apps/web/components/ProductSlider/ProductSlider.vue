<template>
  <SfScrollable
    buttons-placement="floating"
    class="pb-4 scrollbar-hidden"
    :wrapper-class="wrapperClass"
    data-testid="product-slider"
  >
    <UiProductCard
      v-for="product in items"
      :key="productGetters.getId(product)"
      :product="product"
      :name="productGetters.getName(product)"
      :slug="productGetters.getSlug(product) + `-${productGetters.getId(product)}`"
      :image-url="addModernImageExtension(productGetters.getSecondPreviewImage(product))"
      :image-alt="
        productImageGetters.getImageAlternate(productImageGetters.getFirstImage(product)) ||
        productGetters.getName(product) ||
        ''
      "
      :image-title="
        productImageGetters.getImageName(productImageGetters.getFirstImage(product)) ||
        productGetters.getName(product) ||
        ''
      "
      :image-height="productGetters.getImageHeight(product) || 600"
      :image-width="productGetters.getImageWidth(product) || 600"
      :rating-count="productGetters.getTotalReviews(product)"
      :rating="productGetters.getAverageRating(product, 'half')"
      is-from-slider
      class="min-w-56"
    />
  </SfScrollable>
</template>

<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { SfScrollable, SfLink } from '@storefront-ui/vue';
import type { ProductSliderProps } from '~/components/ProductSlider/types';
import { paths } from '~/utils/paths';

const { addModernImageExtension } = useModernImage();
const { showNetPrices } = useCustomer();
const localePath = useLocalePath();

defineProps<ProductSliderProps>();
</script>
