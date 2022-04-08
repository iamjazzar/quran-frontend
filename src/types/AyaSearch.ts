import { IAya } from './Aya';

export interface IAyaSearchWriter {}


export interface IAyaSearchOption  {
  text: string;
  _index: string;
  _id: string;
  _score: number;
  _source: IAya;
}
export interface IAyaSearchCompletion  {
  text: string;
  offset: number;
  length: number;
  options: IAyaSearchOption[];
}

export interface IAyaSearchSuggest {
  clean_text__completion?: IAyaSearchCompletion[];
}
