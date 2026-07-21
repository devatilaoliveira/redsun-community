"use client";

import { useEffect } from "react";

type DefaultLocaleRedirectProps = {
  href: `/${string}`;
};

export function DefaultLocaleRedirect({ href }: DefaultLocaleRedirectProps) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return null;
}
