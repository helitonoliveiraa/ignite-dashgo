import { Box, VStack, Text, Link, Icon } from '@chakra-ui/react';
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri';
import { Navlink } from './NavLink';
import { NavSection } from './NavSection';

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <VStack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <Navlink icon={RiDashboardLine}>
            Dashboar
          </Navlink>

          <Navlink icon={RiContactsLine}>
          Usuários
          </Navlink>
        </NavSection>

        <NavSection title="GERAL">
          <Navlink icon={RiInputMethodLine}>
            Formulários
          </Navlink>

          <Navlink icon={RiGitMergeLine}>
          Automação
          </Navlink>
        </NavSection>
      </VStack>
    </Box>
  )
}