import request from '@/utils/request';
import type { CurrencyInfo, CurrencyModalInfo } from '@/types';

export const getCurrencies = (data: CurrencyInfo) =>
  request({
    method: 'GET',
    url: `/top/totaltoptiervolfull`,
    params: data,
  });

export const getModalCurrencies = (data: CurrencyModalInfo) =>
  request({
    method: 'GET',
    url: `/pricemulti`,
    params: data,
  });
