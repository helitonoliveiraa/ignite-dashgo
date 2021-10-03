import { 
  Icon, 
  Text, 
  Link as ChakraLink, 
  LinkProps as ChakraLinkProps 
} from '@chakra-ui/react';
import { ElementType } from 'react';
import Link from 'next/link';

type NavlinkProps = ChakraLinkProps & {
  icon: ElementType;
  children: string;
  href: string;
};

export function Navlink({ children, icon, href, ...linkProps }: NavlinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" align="center" {...linkProps}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </Link>
  );
}