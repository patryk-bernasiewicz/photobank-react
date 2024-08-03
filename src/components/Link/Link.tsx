import type { CSSProperties, ReactNode } from 'react';
import { Link as RouterLink, type NavLinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type LinkProps = NavLinkProps & {
  children: ReactNode;
  style?: CSSProperties;
};

export const Link = (props: LinkProps) => (
  <RouterLink
    {...props}
    className={twMerge(
      'font-medium text-blue-600 hover:underline focus:underline active:text-blue-500',
      typeof props.className === 'string' ? props.className : '',
    )}
  >
    {props.children}
  </RouterLink>
);
