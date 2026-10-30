import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

// Locales a user can pick at runtime via the header language toggle.
// The choice lives in this cookie and wins over NEXT_PUBLIC_APP_LOCALE.
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const SWITCHABLE_LOCALES = ['en', 'pt-BR', 'ko'];

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  // Read the locale from the cookie, then the environment, defaulting to 'en'
  const locale =
    cookieLocale && SWITCHABLE_LOCALES.includes(cookieLocale)
      ? cookieLocale
      : process.env.NEXT_PUBLIC_APP_LOCALE || 'en';

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to English if the dictionary for the requested locale doesn't exist yet
    messages = (await import(`../../messages/en.json`)).default;
  }

  return {
    locale,
    messages
  };
});
