<script setup lang="ts">
import { ref, watch } from 'vue';
import type { CurrencyListType } from '@/types';

const props = defineProps<{
  currencyListType: CurrencyListType;
}>();

const emit = defineEmits<{
  (event: 'change-list-type', type: CurrencyListType): void;
}>();

const tempCurrencyListType = ref<CurrencyListType>(props.currencyListType);

const changeCurrencyListType = (type: CurrencyListType) => {
  tempCurrencyListType.value = type;

  emit('change-list-type', tempCurrencyListType.value);
};

watch(
  () => props.currencyListType,
  (newValue) => {
    tempCurrencyListType.value = newValue;
  },
);
</script>

<script lang="ts">
export default {
  name: 'currencyList',
};
</script>

<template>
  <div class="overflow-x-auto overflow-y-hidden md:overflow-x-visible">
    <ul class="flex min-w-[500px] space-x-10">
      <li>
        <router-link
          :to="{ name: 'optional' }"
          class="rounded px-2 py-1 duration-300 hover:bg-gray-200"
          :class="{ 'bg-gray-200': tempCurrencyListType === 'optional' }"
          @click="changeCurrencyListType('optional')"
          >自選</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'popular' }"
          class="rounded px-2 py-1 duration-300 hover:bg-gray-200"
          :class="{ 'bg-gray-200': tempCurrencyListType === 'popular' }"
          @click="changeCurrencyListType('popular')"
          >熱門</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'new' }"
          class="rounded px-2 py-1 duration-300 hover:bg-gray-200"
          :class="{ 'bg-gray-200': tempCurrencyListType === 'new' }"
          @click="changeCurrencyListType('new')"
          >新幣上線</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'gainer' }"
          class="rounded px-2 py-1 duration-300 hover:bg-gray-200"
          :class="{ 'bg-gray-200': tempCurrencyListType === 'gainer' }"
          @click="changeCurrencyListType('gainer')"
          >漲幅榜</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'loser' }"
          class="rounded px-2 py-1 duration-300 hover:bg-gray-200"
          :class="{ 'bg-gray-200': tempCurrencyListType === 'loser' }"
          @click="changeCurrencyListType('loser')"
          >跌幅榜</router-link
        >
      </li>
    </ul>
  </div>
</template>
