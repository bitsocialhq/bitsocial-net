import React, { type ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import IconLanguage from "@theme/Icon/Language";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import type { Props } from "@theme/NavbarItem/LocaleDropdownNavbarItem";
import {
  getSupportedLanguageEntry,
  LANGUAGE_QUERY_PARAM,
  resolveDocsLanguage,
  SUPPORTED_LANGUAGES,
} from "../../../lib/docsLanguage";
import styles from "@docusaurus/theme-classic/lib/theme/NavbarItem/LocaleDropdownNavbarItem/styles.module.css";

function getLocaleUrl(pathname: string, search: string, hash: string, locale: string) {
  const normalizedPathname = /^\/docs(?:\/[a-z]{2,3})?\/404(?:\.html|\/)?$/.test(pathname)
    ? "/docs/"
    : pathname;
  const searchParams = new URLSearchParams(search);
  searchParams.set(LANGUAGE_QUERY_PARAM, locale);
  const nextSearch = searchParams.toString();

  return `pathname://${normalizedPathname}${nextSearch ? `?${nextSearch}` : ""}${hash}`;
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}: Props): ReactNode {
  const location = useLocation();
  const currentLanguage = getSupportedLanguageEntry(resolveDocsLanguage(location.search));

  const localeItems: LinkLikeNavbarItemProps[] = SUPPORTED_LANGUAGES.map((language) => ({
    label: language.label,
    lang: language.code,
    to: getLocaleUrl(location.pathname, location.search, location.hash, language.code),
    target: "_self",
    autoAddBaseUrl: false,
    className:
      language.code === currentLanguage.code
        ? mobile
          ? "menu__link--active"
          : "dropdown__link--active"
        : "",
  }));

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];
  const dropdownLabel = mobile
    ? translate({
        id: "theme.navbar.mobileLanguageDropdown.label",
        message: "Languages",
        description: "The label for the mobile language switcher dropdown",
      })
    : currentLanguage.label;

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <IconLanguage className={styles.iconLanguage} />
          {dropdownLabel}
        </>
      }
      items={items}
    />
  );
}
