import { Link, Icon, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { ElementType } from 'react';

type NavlinkProps = ChakraLinkProps & {
  icon: ElementType;
  children: string;
};

export function Navlink({ children, icon, ...linkProps }: NavlinkProps) {
  return (
    <Link display="flex" align="center" {...linkProps}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  );
}