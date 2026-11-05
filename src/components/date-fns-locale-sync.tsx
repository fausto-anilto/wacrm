"use client";

import { setDefaultOptions } from "date-fns";
import { enUS, ko, ptBR, type Locale } from "date-fns/locale";
import { useLocale } from "next-intl";

const DATE_FNS_LOCALES: Record<string, Locale> = {
  en: enUS,
  ko,
  "pt-BR": ptBR,
};

/**
 * Points every date-fns `format` / `formatDistanceToNow` call at the
 * active UI language, so relative times ("5 minutes ago") and month
 * names follow the locale without threading `{ locale }` through each
 * call site. Browser-only: the server process is shared across
 * requests, so it is left on the date-fns default.
 */
export function DateFnsLocaleSync() {
  const locale = useLocale();
  if (typeof window !== "undefined") {
    setDefaultOptions({ locale: DATE_FNS_LOCALES[locale] ?? enUS });
  }
  return null;
}
