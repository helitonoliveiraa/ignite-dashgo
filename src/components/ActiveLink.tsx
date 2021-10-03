import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
};

export function ActiveLink({ children, shouldMatchExactHref, ...linkProps }: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMatchExactHref && (asPath === linkProps.href || asPath === linkProps.as)) {
    isActive = true;
  }

  if (!shouldMatchExactHref && 
      (asPath.startsWith(String(linkProps.href))) ||
      (asPath.startsWith(String(linkProps.as)))
    ) {
      isActive = true;
    }

  return (
    <Link {...linkProps}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </Link>
  );
}