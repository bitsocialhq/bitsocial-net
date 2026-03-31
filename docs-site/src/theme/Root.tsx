import React, { useEffect, type ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import {
  getSupportedLanguageEntry,
  persistDocsLanguageFromSearch,
  resolveDocsLanguage,
} from "../lib/docsLanguage";

function DocsLanguageSync() {
  const location = useLocation();

  useEffect(() => {
    persistDocsLanguageFromSearch(location.search);
    if (typeof document === "undefined") {
      return;
    }

    const language = getSupportedLanguageEntry(resolveDocsLanguage(location.search));
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir === "rtl" ? "rtl" : "ltr";
  }, [location.search]);

  return null;
}

export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <DocsLanguageSync />
      {children}
    </>
  );
}
