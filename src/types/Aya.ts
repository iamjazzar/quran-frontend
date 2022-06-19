import { ParsedUrlQuery } from "querystring";
import { IJuz } from './Juz';
import { ISora } from './Sora';

export interface IAyaParams extends ParsedUrlQuery {
  id: string;
}
export interface IAyaWriter {}

export interface IAya {
  id: string;
  sora: number | ISora;
  juz: number | IJuz;
  text: string;
  clean_text: string;
  number: number;
  page: number;
  line_start: number;
  line_end: number;
  created: string;
  updated: string;
}

export type IPageGroup = {
  [key: number]: IAya[];
};
