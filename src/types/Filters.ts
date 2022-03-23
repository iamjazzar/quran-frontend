export interface IField {
  value: string;
  label: string;
  label_ar: string;
}

export interface IFilter {
  value: string;
  label: string;
  label_ar: string;
  fields: IField[];
}

export interface IFiltersType {
  ordering: IField[];
  filtering: IFilter[];
  extra: IField[];
}
