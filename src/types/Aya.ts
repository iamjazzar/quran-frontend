import { ParsedUrlQuery } from "querystring";

export interface IAyaParams extends ParsedUrlQuery {
  id: string;
}
export interface IAyaWriter {}

export interface IAya {
  id: string;
  sora: number;
  juz: number;
  text: string;
  clean_text: string;
  number: number;
  page: number;
  line_start: number;
  line_end: number;
  created: string;
  updated: string;
}
