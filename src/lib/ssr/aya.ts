import { apiClient } from 'api/client';
import { IAya, IAyaParams } from 'types/Aya';
import { ListResponse } from 'api/consumers';
import { AxiosResponse } from 'axios';
import paths from 'utils/paths';

export interface PagePathArguments {
  params: IAyaParams;
  locale: string;
}


export const ayaPaths = async () => {
  let ayaPaths: PagePathArguments[] = [];
  let nextPage: string|null = paths.api.aya;

  while (nextPage) {
    const response: AxiosResponse<ListResponse<IAya>> = await apiClient.get(nextPage);
    const results = response?.data?.results || [];

    for (let aya of results)  {
      for (const locale of ["ar", "en"]) {
        ayaPaths.push({
          params: {
            id: aya.id,
          },
          locale,
        });
      }
    }

    nextPage = response.data?.next;
  }

  return ayaPaths;
};
