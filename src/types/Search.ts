import { IAya } from './Aya';
import { IAyaSearchOption } from './AyaSearch';
import { IJuz } from './Juz';
import { ISora } from './Sora';

export type SearchResultType = "aya" | "juz" | "sora"| "suggestion"| "other";
export interface ISearchItem {
  id: string;
  type: SearchResultType;
  text: string;
  sora: ISora;
  aya: IAya;
  meta: IJuz | ISora | IAya | IAyaSearchOption;
}


export type ISearchGroup = {
  [key in SearchResultType]: ISearchItem[];
};
