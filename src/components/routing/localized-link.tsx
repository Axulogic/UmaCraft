"use client";

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import Link, { type LinkProps } from "next/link";

import { useLocalizedPath } from "@/lib/use-locale";

type LocalizedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<LinkProps, "href"> & {
    children: ReactNode;
    href: string;
  };

export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, ...props }, ref) => {
    const localizedHref = useLocalizedPath(href);

    return (
      <Link href={localizedHref} ref={ref} {...props}>
        {children}
      </Link>
    );
  },
);

LocalizedLink.displayName = "LocalizedLink";
