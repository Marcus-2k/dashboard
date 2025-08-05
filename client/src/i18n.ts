import { DEFAULT_LANGUAGE } from "@shared/constants";
import { environment } from "@shared/environment/environment";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    debug: environment.environment === "prod" ? false : true,
    backend: {
      loadPath: "/assets/i18n/{{lng}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
