import { ParsedUrlQuery } from "querystring";


export interface IJuzParams extends ParsedUrlQuery {
  number: string;
}
export interface IJuzWriter {}

export interface IJuz {
  id: string;
  number: number;
  number_worded_ar: string;
  number_worded_en: string;
  created: string;
  updated: string;
}
