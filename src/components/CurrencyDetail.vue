<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import CurrencyModal from '@/components/CurrencyModal.vue';
import { roundToTwoDecimalPlaces } from '@/helper';

const props = defineProps<{
  filterCurrency: any;
  isOpenDetail: boolean;
  currentCurrencyId: string;
}>();

const emit = defineEmits<{
  (event: 'toggle-detail', detail: boolean): void;
}>();

const router = useRouter();

const tempIsOpenDetail = ref(props.isOpenDetail);

const isOpenModal = ref(false);

const formatVolume = computed(() => {
  return roundToTwoDecimalPlaces(props.filterCurrency[0].RAW.USD.VOLUME24HOUR)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

const handleGoBack = () => {
  tempIsOpenDetail.value = false;

  emit('toggle-detail', tempIsOpenDetail.value);

  router.push({
    name: 'home',
  });
};

const toggleModal = (modal: boolean) => {
  isOpenModal.value = modal;
};

watch(
  () => props.isOpenDetail,
  (newValue) => {
    tempIsOpenDetail.value = newValue;
  },
);
</script>

<script lang="ts">
export default {
  name: 'CurrencyDetail',
};
</script>

<template>
  <div
    class="fixed left-0 top-0 z-[999] h-full w-full bg-gray-400 px-5 pt-[70px] duration-300"
    :class="tempIsOpenDetail ? 'translate-x-0' : 'translate-x-[100%]'"
  >
    <div class="flex items-center justify-between">
      <button type="button" @click="handleGoBack">
        <svg
          width="21"
          height="17"
          viewBox="0 0 21 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 8.25492e-07L10.6375 2.05417L5.53438 7.08333L21 7.08333L21 9.91667L5.53437 9.91667L10.6375 14.9458L8.625 17L-1.16426e-06 8.5L8.625 8.25492e-07Z"
            fill="#909090"
          />
        </svg>
      </button>
      <h2 class="text-[20px]">{{ filterCurrency[0].CoinInfo.Name }}</h2>
      <button type="button" @click="isOpenModal = !isOpenModal">
        <svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7 0H11V3H18V19H11V22H7V19H0V3H7V0ZM15 7H11V16H15V7Z"
            fill="#909090"
          />
        </svg>
      </button>
    </div>
    <div class="mt-7 flex items-center justify-between">
      <span class="text-[36px] text-primary">{{
        roundToTwoDecimalPlaces(filterCurrency[0].RAW.USD.PRICE)
      }}</span>
      <div class="text-[11px]">
        <ul>
          <li>
            <p class="text-gray-100">24h最高價</p>
            <span
              >{{ roundToTwoDecimalPlaces(filterCurrency[0].RAW.USD.HIGHDAY) }}
            </span>
          </li>
        </ul>
        <ul class="mt-2 flex">
          <li>
            <p class="text-gray-100">24h最低價</p>
            <span>{{
              roundToTwoDecimalPlaces(filterCurrency[0].RAW.USD.LOWDAY)
            }}</span>
          </li>
          <li class="ml-[10px]">
            <p class="text-gray-100">24h成交量(USDT)</p>
            <span>{{ formatVolume }}萬</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <CurrencyModal :isOpenModal="isOpenModal" @toggle-modal="toggleModal" />
</template>
