import { ParsedUrlQuery } from "querystring";

export interface ISoraParams extends ParsedUrlQuery {
  number: string;
}
export interface ISoraWriter {}

export interface ISora {
  id: string;
  name_en: string;
  name_ar: string;
  ayas_count: number;
  clean_name_ar: string;
  number: number;
  created: string;
  updated: string;
}
