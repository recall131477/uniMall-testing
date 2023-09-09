<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { roundToTwoDecimalPlaces } from '@/helper';
import { getModalCurrencies } from '@/api';
import type { CurrencyModalInfo } from '@/types';

const props = defineProps<{
  currentCurrencyName: string;
  isOpenModal: boolean;
}>();

const emit = defineEmits<{
  (event: 'toggle-modal', modal: boolean): void;
}>();

const tempIsOpenModal = ref(props.isOpenModal);

const currencyModalData = ref({
  USD: 0,
  EUR: 0,
  CNY: 0,
});

const closeModal = () => {
  tempIsOpenModal.value = false;

  emit('toggle-modal', tempIsOpenModal.value);
};

const fetchModalCurrencies = async () => {
  try {
    const data: CurrencyModalInfo = {
      api_key: import.meta.env.VITE_API_KEY,
      tsyms: 'USD,EUR,CNY',
      fsyms: 'USD',
    };

    const res = await getModalCurrencies(data);

    currencyModalData.value = res.data.USD;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchModalCurrencies();
});

watch(
  () => props.isOpenModal,
  (newValue) => {
    tempIsOpenModal.value = newValue;
  },
);
</script>

<script lang="ts">
export default {
  name: 'CurrencyModal',
};
</script>

<template>
  <div
    class="fixed inset-0 z-[1000] duration-300"
    :class="tempIsOpenModal ? 'opacity-100 visible' : 'opacity-0 invisible'"
  >
    <div
      class="fixed left-0 top-0 h-full w-full bg-black/30"
      @click="closeModal"
    ></div>
    <div
      class="pointer-events-none relative mx-auto flex h-full max-w-[340px] items-center justify-center"
    >
      <div
        class="pointer-events-auto w-full rounded-md bg-gray-400 px-4 pb-10 pt-6"
        v-if="currencyModalData"
      >
        <h2 class="text-center text-[23px]">市場對比</h2>
        <ul class="mt-5 space-y-4">
          <li>
            <button
              type="button"
              class="flex w-full justify-between rounded-md bg-gray-300 px-4 py-5"
            >
              <span class="text-[18px]">{{ currentCurrencyName }} / USD</span>
              <span>{{ roundToTwoDecimalPlaces(currencyModalData.USD) }}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex w-full justify-between rounded-md bg-gray-300 px-4 py-5"
            >
              <span class="text-[18px]">{{ currentCurrencyName }} / EUR</span>
              <span>{{ roundToTwoDecimalPlaces(currencyModalData.EUR) }}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="flex w-full justify-between rounded-md bg-gray-300 px-4 py-5"
            >
              <span class="text-[18px]">{{ currentCurrencyName }} / CNY</span>
              <span>{{ roundToTwoDecimalPlaces(currencyModalData.CNY) }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
