import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from "next/router";

type SidebarDrawerContextData = UseDisclosureReturn;

type SidebarDrawerProviderProps = {
  children: ReactNode;
};

const SidebarDrawerContext = createContext<SidebarDrawerContextData>({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export function useSidebarDrawer() {
  const context = useContext(SidebarDrawerContext);

  return context;
}