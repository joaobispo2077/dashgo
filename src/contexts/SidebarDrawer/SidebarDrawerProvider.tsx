import { useDisclosure } from '@chakra-ui/hooks';
import { ReactNode } from 'react';
import { SidebarDrawerContext } from '.';

export type SidebarDrawerProviderProps = {
  children: ReactNode;
};

export function SidebarDrawerProvider({ children }) {
  const disclosure = useDisclosure();

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}
