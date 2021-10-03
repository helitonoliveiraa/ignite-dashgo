import { VStack } from '@chakra-ui/react';
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri';
import { Navlink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <VStack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <Navlink icon={RiDashboardLine} href="/dashboard">
          Dashboar
        </Navlink>

        <Navlink icon={RiContactsLine} href="/users">
        Usuários
        </Navlink>
      </NavSection>

      <NavSection title="GERAL">
        <Navlink icon={RiInputMethodLine} href="/forms">
          Formulários
        </Navlink>

        <Navlink icon={RiGitMergeLine} href="/automation">
        Automação
        </Navlink>
      </NavSection>
    </VStack>
  );
}