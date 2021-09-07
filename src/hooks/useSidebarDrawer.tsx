import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { useContext } from 'react';
import { SidebarDrawerContext } from '../contexts/SidebarDrawer';

export function useSidebarDrawer(): UseDisclosureReturn {
  const disclosure = useContext(SidebarDrawerContext);
  return disclosure;
}
