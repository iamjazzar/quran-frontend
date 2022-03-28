import { apiClient } from 'api/client';
import { IJuz, IJuzParams } from 'types/Juz';
import { ListResponse } from 'api/consumers';
import { AxiosResponse } from 'axios';
import paths from 'utils/paths';

export interface PagePathArguments {
  params: IJuzParams;
  locale: string;
}


export const juzPaths = async () => {
  let juzPaths: PagePathArguments[] = [];
  let nextPage: string|null = paths.api.juz;

  while (nextPage) {
    const response: AxiosResponse<ListResponse<IJuz>> = await apiClient.get(nextPage);
    const results = response?.data?.results || [];

    for (let juz of results)  {
      for (const locale of ["ar", "en"]) {
        juzPaths.push({
          params: {
            number: juz.number.toString(),
          },
          locale,
        });
      }
    }

    nextPage = response.data?.next;
  }

  return juzPaths;
};
