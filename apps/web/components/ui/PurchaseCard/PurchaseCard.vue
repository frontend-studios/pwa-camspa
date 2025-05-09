<template>
  <form
    class="md:border md:border-neutral-100 md:shadow-lg md:rounded-md md:sticky md:top-40"
    data-testid="purchase-card"
    @submit.prevent="handleAddToCart()"
  >
    <div class="relative">
      <div class="drift-zoom-image">
        <section class="p-4 xl:p-6 bg-white">
          <div class="grid grid-cols-[2fr_1fr] mt-4">
            <h1 class="font-bold typography-headline-4" data-testid="product-name">
              {{ productGetters.getName(product) }}
            </h1>
            <div class="flex items-center justify-center">
              <WishlistButton
                :product="product"
                :quantity="quantitySelectorValue"
                :square="viewport.isLessThan('lg')"
                :class="{
                  'bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full':
                    viewport.isLessThan('lg'),
                }"
              >
                <template v-if="viewport.isGreaterOrEquals('lg')">
                  {{
                    !isWishlistItem(productGetters.getVariationId(product))
                      ? t('addToWishlist')
                      : t('removeFromWishlist')
                  }}
                </template>
              </WishlistButton>
            </div>
          </div>
          <div class="flex space-x-2">
            <Price :price="priceWithProperties" :crossed-price="crossedPrice" />
            <div v-if="(productBundleGetters?.getBundleDiscount(product) ?? 0) > 0" class="m-auto">
              <UiTag :size="'sm'" :variant="'secondary'">{{
                t('procentageSavings', { percent: productBundleGetters.getBundleDiscount(product) })
              }}</UiTag>
            </div>
          </div>
          <LowestPrice :product="product" />
          <BasePrice
            v-if="productGetters.showPricePerUnit(product)"
            :base-price="basePriceSingleValue"
            :unit-content="productGetters.getUnitContent(product)"
            :unit-name="productGetters.getUnitName(product)"
          />
          <UiBadges class="mt-4 availability" :product="product" :use-availability="true" />

          <div
            v-if="productGetters.getShortDescription(product).length > 0"
            class="mb-4 font-normal typography-text-sm whitespace-pre-line break-words"
            data-testid="product-description"
            v-html="productGetters.getShortDescription(product)"
          />

          <ProductAttributes :product="product" />
          <BundleOrderItems v-if="product.bundleComponents" :product="product" />
          <OrderProperties :product="product" />
          <GraduatedPriceList :product="product" :count="quantitySelectorValue" />

          <div class="mt-4">
            <div class="flex flex-col md:flex-row flex-wrap gap-4">
              <UiQuantitySelector
                :min-value="productGetters.getMinimumOrderQuantity(product)"
                :value="quantitySelectorValue"
                class="min-w-[145px] flex-grow-0 flex-shrink-0 basis-0"
                @change-quantity="changeQuantity"
              />
              <SfTooltip
                show-arrow
                placement="top"
                :label="isNotValidVariation || isSalableText"
                class="flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
              >
                <UiButton
                  type="submit"
                  data-testid="add-to-cart"
                  size="lg"
                  class="w-full h-full"
                  :disabled="loading || !productGetters.isSalable(product)"
                >
                  <template #prefix>
                    <div v-if="!loading" class="flex row items-center">
                      <SfIconShoppingCart size="sm" />
                      {{ t('addToCart') }}
                    </div>
                    <div v-else>
                      <SfLoaderCircular size="sm" />
                    </div>
                  </template>
                </UiButton>
              </SfTooltip>
            </div>

            <div class="mt-4 typography-text-xs flex gap-1">
              <span>{{ t('asterisk') }}</span>
              <span>{{ showNetPrices ? t('itemExclVAT') : t('itemInclVAT') }}</span>
              <i18n-t keypath="excludedShipping" scope="global">
                <template #shipping>
                  <SfLink
                    :href="localePath(paths.shipping)"
                    target="_blank"
                    class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
                  >
                    {{ $t('delivery') }}
                  </SfLink>
                </template>
              </i18n-t>
            </div>
            <template v-if="showPayPalButtons">
              <PayPalExpressButton type="SingleItem" class="mt-4" @validation-callback="paypalHandleAddToCart" />
              <PayPalPayLaterBanner placement="product" :amount="priceWithProperties * quantitySelectorValue" />
            </template>
          </div>
        </section>
      </div>
    </div>
  </form>
  <div class="mt-5 lg:mt-10 variation-properties">
    <p class="text-lg font-bold mb-3 px-3 md:px-0">Im Überblick:</p>
    <VariationProperties :product="product" />
  </div>

  <template v-for="barcode in product.barcodes || []" :key="barcode.code">
    <p class="ml-3 md:ml-0 mb-0"><span>EAN: </span>{{ barcode.code }}</p>
  </template>

  <template v-if="product.variation.number != ''">
    <p class="ml-3 md:ml-0 mb-0"><span>SKU: </span>{{ product.variation.number }}</p>
  </template>
</template>

<script setup lang="ts">
import { productGetters, reviewGetters, productBundleGetters } from '@plentymarkets/shop-api';
import { SfCounter, SfRating, SfIconShoppingCart, SfLoaderCircular, SfTooltip, SfLink } from '@storefront-ui/vue';
import type { PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import type { PayPalAddToCartCallback } from '~/components/PayPal/types';
import { paths } from '~/utils/paths';

const { product, reviewAverage } = defineProps<PurchaseCardProps>();

const { showNetPrices } = useCustomer();
const viewport = useViewport();
const { getCombination } = useProductAttributes();
const { getPropertiesForCart, getPropertiesPrice } = useProductOrderProperties();
const { validateAllFields, invalidFields, resetInvalidFields } = useValidatorAggregator('properties');
const {
  validateAllFields: validateAllFieldsAttributes,
  invalidFields: invalidAttributeFields,
  resetInvalidFields: resetAttributeFields,
} = useValidatorAggregator('attributes');
const { clear, send } = useNotification();
const { addToCart, loading } = useCart();
const { t } = useI18n();
const quantitySelectorValue = ref(productGetters.getMinimumOrderQuantity(product));
const { isWishlistItem } = useWishlist();
const { openQuickCheckout } = useQuickCheckout();
const { crossedPrice } = useProductPrice(product);
const { reviewArea } = useProductReviews(Number(productGetters.getId(product)));
const localePath = useLocalePath();

onMounted(() => {
  resetInvalidFields();
  resetAttributeFields();
});

onBeforeRouteLeave(() => {
  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) clear();
});

const priceWithProperties = computed(
  () =>
    (productGetters.getSpecialOffer(product) ||
      productGetters.getGraduatedPriceByQuantity(product, quantitySelectorValue.value)?.unitPrice.value ||
      0) + getPropertiesPrice(product),
);

const basePriceSingleValue = computed(
  () =>
    productGetters.getGraduatedPriceByQuantity(product, quantitySelectorValue.value)?.basePrice ??
    productGetters.getDefaultBasePrice(product),
);

const handleValidationErrors = (): boolean => {
  send({
    message: [
      t('errorMessages.missingOrWrongProperties'),
      '',
      ...invalidAttributeFields.value.map((field) => field.name),
      ...invalidFields.value.map((field) => field.name),
      '',
      t('errorMessages.pleaseFillOutAllFields'),
    ],
    type: 'negative',
  });

  return false;
};

const handleAddToCart = async (quickCheckout = true) => {
  await validateAllFieldsAttributes();
  await validateAllFields();

  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) {
    return handleValidationErrors();
  }

  if (!getCombination()) {
    send({ message: t('productAttributes.notValidVariation'), type: 'negative' });
    return false;
  }

  const addedToCart = await addToCart({
    productId: Number(productGetters.getId(product)),
    quantity: Number(quantitySelectorValue.value),
    basketItemOrderParams: getPropertiesForCart(),
  });

  if (addedToCart) {
    quickCheckout === true
      ? openQuickCheckout(product, quantitySelectorValue.value)
      : send({ message: t('addedToCart'), type: 'positive' });
  }

  return addedToCart;
};

const paypalHandleAddToCart = async (callback: PayPalAddToCartCallback) => {
  const added = await handleAddToCart(false);

  callback(added);
};

const changeQuantity = (quantity: string) => {
  quantitySelectorValue.value = Number(quantity);
};

const isReviewsAccordionOpen = () => {
  const customerReviewsAccordionDetailsElement = document.querySelector('#customerReviewsAccordion')
    ?.firstChild as HTMLDetailsElement;

  return customerReviewsAccordionDetailsElement.open;
};

const openReviewsAccordion = () => {
  const customerReviewsClickElement = document.querySelector('#customerReviewsClick') as HTMLElement;
  customerReviewsClickElement?.click();
};

const isSalableText = computed(() => (productGetters.isSalable(product) ? '' : t('itemNotAvailable')));
const isNotValidVariation = computed(() => (getCombination() ? '' : t('productAttributes.notValidVariation')));
const showPayPalButtons = computed(() => Boolean(getCombination()) && productGetters.isSalable(product));

const scrollToReviews = () => {
  if (!isReviewsAccordionOpen()) {
    openReviewsAccordion();
  }

  if (reviewArea.value) {
    reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
