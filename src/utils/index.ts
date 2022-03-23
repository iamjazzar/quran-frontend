import { NextRouter } from 'next/router';
import { FormWriterType } from 'types/generic';
import cookieCutter from "cookie-cutter";

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getFormData(data: FormWriterType): FormData {
  let formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value) {
      formData.append(key, value);
    }
  }

  return formData;
}


export function switchLanguage(newLanguage: string, router: NextRouter) {
  cookieCutter.set("NEXT_LOCALE", newLanguage, { path: "/" });
  router.push(
    {
      pathname: router.pathname,
      query: router.query,
    },
    router.asPath,
    { locale: newLanguage }
  );

}
