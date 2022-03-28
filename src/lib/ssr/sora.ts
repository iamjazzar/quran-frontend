import { apiClient } from 'api/client';
import { ISora, ISoraParams } from 'types/Sora';
import { ListResponse } from 'api/consumers';
import { AxiosResponse } from 'axios';
import paths from 'utils/paths';

export interface PagePathArguments {
  params: ISoraParams;
  locale: string;
}


export const soraPaths = async () => {
  let soraPaths: PagePathArguments[] = [];
  let nextPage: string|null = paths.api.sora;

  while (nextPage) {
    const response: AxiosResponse<ListResponse<ISora>> = await apiClient.get(nextPage);
    const results = response?.data?.results || [];

    for (let sora of results)  {
      for (const locale of ["ar", "en"]) {
        soraPaths.push({
          params: {
            number: sora.number.toString(),
          },
          locale,
        });
      }
    }

    nextPage = response.data?.next;
  }

  return soraPaths;
};
