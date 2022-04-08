import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IAya, IAyaWriter } from 'types/Aya';
import paths from 'utils/paths';
import { Consumer, SearchConsumer, SoraConsumer } from 'api/consumers';
import { IJuz, IJuzWriter } from 'types/Juz';
import { ISora, ISoraWriter } from 'types/Sora';
import { IAyaSearchSuggest } from 'types/AyaSearch';

class ApiClient {
  readonly _axios: AxiosInstance;

  private static instance: ApiClient;

  private constructor() {
    this._axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_VERCEL_URL,
    });
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  get quranJuz(): Consumer<IJuz, IJuzWriter> {
    return new Consumer(paths.api.juz);
  }


  get quranSora(): SoraConsumer<ISora, ISoraWriter, IAya> {
    return new SoraConsumer(paths.api.sora);
  }


  get quranAya(): Consumer<IAya, IAyaWriter> {
    return new Consumer(paths.api.aya);
  }


  get ayaSearch(): SearchConsumer<IAya, IAyaWriter, IAyaSearchSuggest> {
    return new SearchConsumer(paths.api.search.aya);
  }

  public get(url: string, cookie?: string): Promise<AxiosResponse> {
    return this._axios.get(url.replace(process.env.NEXT_PUBLIC_API_URI as string, ''), {
      headers: cookie ? { cookie: cookie } : undefined,
    });
  }
}

export const apiClient = ApiClient.getInstance();
