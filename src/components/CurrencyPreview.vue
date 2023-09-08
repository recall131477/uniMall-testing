<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { roundToTwoDecimalPlaces } from '@/helper';
import { getCurrencies } from '@/api';
import type { CurrencyListType, CurrencyInfo } from '@/types';
import CurrencyDetail from '@/components/CurrencyDetail.vue';

const props = defineProps<{
  currencyListType: CurrencyListType;
}>();

const emit = defineEmits<{
  (event: 'update-list-type', type: CurrencyListType): void;
}>();

const tempCurrencyListType = ref<CurrencyListType>('');
const currencyData = ref<
  Array<{
    CoinInfo: { Id: string; Name: string };
    RAW: { USD: { PRICE: number; CHANGEPCT24HOUR: number } };
  }>
>([]);
const filterCurrency = ref<Array<{ CoinInfo: { Id: string } }>>([]);

const currentCurrencyId = ref('');

const isOpenDetail = ref(false);

const toggleDetail = (detail: boolean) => {
  isOpenDetail.value = detail;
};

const goCurrencyDetail = (item: any) => {
  isOpenDetail.value = !isOpenDetail.value;
  currentCurrencyId.value = item.CoinInfo.Id;

  filterCurrency.value = currencyData.value.filter(
    (item) => item.CoinInfo.Id === currentCurrencyId.value,
  );

  tempCurrencyListType.value = '';

  emit('update-list-type', tempCurrencyListType.value);
};

const fetchCurrencies = async () => {
  try {
    const data: CurrencyInfo = {
      api_key: import.meta.env.VITE_API_KEY,
      limit: 10,
      tsym: 'USD',
    };

    const res = await getCurrencies(data);
    currencyData.value = res.data.Data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchCurrencies();
});

watch(
  () => props.currencyListType,
  (newValue) => {
    tempCurrencyListType.value = newValue;
  },
);
</script>

<script lang="ts">
export default {
  name: 'currencyPreview',
};
</script>

<template>
  <table class="mt-4 w-full border-separate border-spacing-y-[30px]">
    <thead>
      <tr>
        <th class="w-1/3 text-left">
          名稱
          <template v-if="tempCurrencyListType"
            >({{ currencyListType }})
          </template>
        </th>
        <th class="w-1/3 text-right">最新價</th>
        <th class="w-1/3 text-right">24h漲跌%</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="cursor-pointer duration-300 hover:bg-gray-300"
        v-for="item in currencyData"
        :key="item.CoinInfo.Id"
        @click="goCurrencyDetail(item)"
      >
        <td class="flex">
          <img
            src="https://www.cryptocompare.com/media/37746251/btc.png"
            alt="icon"
            class="w-6 h-6 mr-2"
          />
          {{ item.CoinInfo.Name }}
        </td>
        <td class="text-right">
          {{ roundToTwoDecimalPlaces(item.RAW.USD.PRICE) }}
        </td>
        <td class="flex justify-end">
          <span class="block w-[100px] rounded bg-primary px-4 py-2 text-center"
            >{{ roundToTwoDecimalPlaces(item.RAW.USD.CHANGEPCT24HOUR) }}%</span
          >
        </td>
      </tr>
    </tbody>
  </table>
  <CurrencyDetail
    v-if="filterCurrency.length"
    :filterCurrency="filterCurrency"
    :currentCurrencyId="currentCurrencyId"
    :isOpenDetail="isOpenDetail"
    @toggle-detail="toggleDetail"
  />
</template>
