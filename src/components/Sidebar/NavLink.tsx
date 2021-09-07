import {
  Icon,
  Text,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { ElementType } from 'react';
import Link from 'next/link';

export type NavLinkProps = {
  icon: ElementType;
  children: string;
  href: string;
} & ChakraLinkProps;

export function NavLink({ href, icon, children, ...rest }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </Link>
  );
}
