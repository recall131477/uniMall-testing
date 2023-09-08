<script setup lang="ts">
import { ref } from 'vue';
import CurrencyList from '@/components/CurrencyList.vue';
import CurrencyPreview from '@/components/CurrencyPreview.vue';
import type { CurrencyListType } from '@/types';

const currencyListType = ref<CurrencyListType>('');

const changeCurrencyListType = (type: CurrencyListType) => {
  currencyListType.value = type;
};

const updateCurrencyListType = (type: CurrencyListType) => {
  currencyListType.value = type;
};
</script>

<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

<template>
  <div class="p-4">
    <CurrencyList
      :currencyListType="currencyListType"
      @change-list-type="changeCurrencyListType"
    />
    <CurrencyPreview
      :currencyListType="currencyListType"
      @update-list-type="updateCurrencyListType"
    />
  </div>
</template>
