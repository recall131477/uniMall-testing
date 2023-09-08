export type CurrencyListType =
  | ''
  | 'optional'
  | 'popular'
  | 'new'
  | 'gainer'
  | 'loser';

export interface CurrencyInfo {
  api_key: string;
  limit: number;
  tsym: string;
}

export interface CurrencyModalInfo {
  api_key: string;
  tsyms: string;
  fsyms: string;
}
