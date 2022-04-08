import Link, { LinkProps } from 'next/link';
import { ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string;
}

export function ActiveLink({
    children, 
    activeClassName, 
    ... otherProps
}: ActiveLinkProps) {
  return <Link {...otherProps}>{children}</Link>  
}
