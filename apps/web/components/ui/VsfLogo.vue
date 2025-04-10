<template>
  <picture>
    <template v-if="imageExtension === 'svg'">
      <NuxtImg ref="logo" :src="imagePath" :alt="`${{ storeName }} logo`" class="" width="102" height="72" preload />
    </template>
    <template v-else>
      <img
        id="logo"
        ref="logo"
        :src="imagePath"
        :alt="`${{ storeName }} logo`"
        :width="imgWidth"
        :height="imgHeight"
        class="max-h-[72px] max-w-[102px]"
        preload
      />
    </template>
  </picture>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const storeName = runtimeConfig.public.storeName;
const imageExtension = runtimeConfig.public.headerLogo.split('.').pop();
const imagePath = 'https://cdn02.plentymarkets.com/6nqf4rd4jwp6/frontend/CAM/PWA/logo.svg';
const logo = ref<HTMLImageElement | null>(null);
const imgWidth = ref<string>('');
const imgHeight = ref<string>('');
onMounted(() => {
  if (logo.value) {
    imgWidth.value = logo.value.clientWidth + '';
    imgHeight.value = logo.value.clientHeight + '';
  }
});
</script>
