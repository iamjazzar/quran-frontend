const api = {
  aya: '/api/quran/aya/',
  juz: '/api/quran/juz/',
  sora: '/api/quran/sora/',
};

const aya = {
  retrieve: '/aya/[id]/',
};

const juz = {
  list: '/juz/',
  retrieve: '/juz/[number]/',
};

const sora = {
  list: '/sora/',
  retrieve: '/sora/[number]/',
};

const paths = {
  home: '/',
  termsOfService: '/terms-of-service',
  siteMap: '/sitemap.xml',
  privacyPolicy: '/privacy-policy',
  api,
  aya,
  juz,
  sora,
};

export default paths;
