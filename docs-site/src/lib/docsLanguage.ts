import {
  DEFAULT_LANGUAGE_CODE,
  getSupportedLanguage,
  LANGUAGE_QUERY_PARAM,
  LANGUAGE_STORAGE_KEY,
  resolveAutomaticLanguage,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
  type SupportedLanguageCode,
} from "../../../src/lib/locales";

export { SUPPORTED_LANGUAGES, type SupportedLanguage, type SupportedLanguageCode };
export { LANGUAGE_QUERY_PARAM };

function canUseDom() {
  return typeof window !== "undefined";
}

function getResolvedBrowserLocale(): string | null {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    return locale || null;
  } catch {
    return null;
  }
}

function getBrowserLocaleCandidates(): string[] {
  if (!canUseDom()) {
    return [];
  }

  const candidates = [
    window.navigator.language,
    getResolvedBrowserLocale(),
    ...(window.navigator.languages ?? []),
  ];
  const seen = new Set<string>();

  return candidates.filter((locale): locale is string => {
    if (!locale || seen.has(locale)) {
      return false;
    }

    seen.add(locale);
    return true;
  });
}

function readStoredLanguage(): string | null {
  if (!canUseDom()) {
    return null;
  }

  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredLanguage(language: SupportedLanguageCode) {
  if (!canUseDom()) {
    return;
  }

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore environments where storage is unavailable.
  }
}

export function resolveDocsLanguage(search: string): SupportedLanguageCode {
  const searchParams = new URLSearchParams(search);
  const queryLanguage = searchParams.get(LANGUAGE_QUERY_PARAM);
  if (queryLanguage) {
    return getSupportedLanguage(queryLanguage).code;
  }

  const storedLanguage = readStoredLanguage();
  if (storedLanguage) {
    return getSupportedLanguage(storedLanguage).code;
  }

  const localeCandidates = getBrowserLocaleCandidates();
  const primaryRegionLocale = canUseDom()
    ? window.navigator.language || getResolvedBrowserLocale()
    : null;

  return resolveAutomaticLanguage(localeCandidates, primaryRegionLocale);
}

export function persistDocsLanguageFromSearch(search: string) {
  const searchParams = new URLSearchParams(search);
  const queryLanguage = searchParams.get(LANGUAGE_QUERY_PARAM);
  if (!queryLanguage) {
    return;
  }

  writeStoredLanguage(getSupportedLanguage(queryLanguage).code);
}

export function getSupportedLanguageEntry(language: string | null | undefined): SupportedLanguage {
  return getSupportedLanguage(language);
}

export function getDefaultDocsLanguage(): SupportedLanguageCode {
  return DEFAULT_LANGUAGE_CODE;
}

export function stripLanguageQueryParam(search: string): string {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(LANGUAGE_QUERY_PARAM);
  const nextSearch = searchParams.toString();

  return nextSearch ? `?${nextSearch}` : "";
}
