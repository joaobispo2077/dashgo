import { ReactNode, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { useRouter } from 'next/dist/client/router';
import { SidebarDrawerContext } from '.';

export type SidebarDrawerProviderProps = {
  children: ReactNode;
};

export function SidebarDrawerProvider({ children }) {
  const router = useRouter();

  const disclosure = useDisclosure();
  const { onClose } = disclosure;

  useEffect(() => onClose(), [onClose, router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}
