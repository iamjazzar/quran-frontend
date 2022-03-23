import axios, { AxiosInstance, AxiosResponse } from 'axios';
import path from 'path';
import { getFormData } from 'utils';
import { IFiltersType } from 'types/Filters';
import { FormWriterType } from 'types/generic';
import { IAya } from 'types/Aya';

export interface ListResponse<Type> {
  next: string | null;
  previous: string | null;
  count?: number;
  results?: Type[];
}


export class Consumer<ReaderType, WriterType, SubType = {}> {
  protected url: string;

  protected _axios: AxiosInstance;

  constructor(url: string) {
    this.url = url;
    this._axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_VERCEL_URL,
    });
  }

  list(
    query?: string,
    cookie?: string,
  ): Promise<AxiosResponse<ListResponse<ReaderType>>> {
    const url = query ? this.url + `?${query}` : this.url;
    return this.get(url, cookie) as Promise<AxiosResponse<ListResponse<ReaderType>>>;
  }

  retrieve(oid: string, cookie?: string): Promise<AxiosResponse<ReaderType>> {
    const url = path.join(this.url, oid, '/');
    return this.get(url, cookie) as Promise<AxiosResponse<ReaderType>>;
  }

  destroy(oid: string): Promise<AxiosResponse<ReaderType>> {
    const url = path.join(this.url, oid, '/');
    return this.delete(url);
  }

  update(
    oid: string,
    data: WriterType,
    isForm: boolean = false,
  ): Promise<AxiosResponse<ReaderType>> {
    const requestData = isForm ? getFormData(data as unknown as FormWriterType) : data;
    const url = path.join(this.url, oid, '/');
    return this.patch(url, requestData);
  }

  create(
    data: WriterType,
    isForm: boolean = false,
  ): Promise<AxiosResponse<ReaderType>> {
    const requestData = isForm ? getFormData(data as unknown as FormWriterType) : data;
    return this.post(this.url, requestData);
  }

  protected post(
    url: string,
    data: WriterType | FormData | {},
  ): Promise<AxiosResponse<ReaderType>> {
    return this._axios.post(url, data);
  }

  protected patch(
    url: string,
    data: WriterType | FormData,
  ): Promise<AxiosResponse<ReaderType>> {
    return this._axios.patch(url, data);
  }

  protected delete(url: string): Promise<AxiosResponse<ReaderType>> {
    return this._axios.delete(url);
  }

  protected get(
    url: string,
    cookie?: string,
  ): Promise<AxiosResponse<ReaderType | IFiltersType | SubType[] | ListResponse<ReaderType>>> {
    return this._axios.get(url, {
      headers: cookie ? { cookie: cookie } : undefined,
    });
  }
}

export class SoraConsumer<ReaderType, WriterType, SubType> extends Consumer<
  ReaderType,
  WriterType,
  SubType
> {
  ayas(oid: number, cookie?: string): Promise<AxiosResponse<SubType[]>> {
    const url = path.join(this.url, `${oid}`, 'ayas', '/');
    return this.get(url, cookie) as Promise<AxiosResponse<SubType[]>>;
  }
}
