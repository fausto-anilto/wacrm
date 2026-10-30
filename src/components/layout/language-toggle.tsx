"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

// Must match LOCALE_COOKIE in src/i18n/request.ts (not imported: that
// module pulls in next/headers, which is server-only).
const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Language toggle — flips the UI between Portuguese (pt-BR) and
 * English. The choice is stored in a cookie read by
 * src/i18n/request.ts, so it survives reloads and overrides
 * NEXT_PUBLIC_APP_LOCALE for this browser.
 *
 * 40×40 hit target to match ModeToggle next to it.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const t = useTranslations("LanguageToggle");
  const locale = useLocale();
  const router = useRouter();
  const goingTo = locale === "pt-BR" ? "en" : "pt-BR";
  const switchLabel = t("switchTo", { language: goingTo === "en" ? "English" : "Português" });

  const switchLocale = () => {
    document.cookie = `${LOCALE_COOKIE}=${goingTo}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={switchLabel}
      title={switchLabel}
      className={cn(
        "flex h-10 items-center justify-center gap-1 rounded-md px-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      <Languages className="h-5 w-5" />
      {goingTo === "en" ? "EN" : "PT"}
    </button>
  );
}
