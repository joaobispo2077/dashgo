import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import { cloneElement, ReactElement } from 'react';

export type ActiveLinkProps = {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
} & LinkProps;

export function ActiveLink({
  shouldMatchExactHref = false,
  children,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const isExactActive = rest.href === asPath || rest.as === asPath;
  const isContainActivePath =
    (shouldMatchExactHref && String(asPath).startsWith(String(rest.href))) ||
    String(asPath).startsWith(String(rest.href));

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isExactActive || isContainActivePath ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
}
