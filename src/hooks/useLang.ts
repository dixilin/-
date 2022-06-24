const useLang = (lang: string) => {
  const langPkg = require(`../locales/${lang}/form.ts`);
  return langPkg.default;
};

export default useLang;
