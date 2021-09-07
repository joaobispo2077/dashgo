import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { createContext } from 'react';

export type SidebarDrawerContextData = UseDisclosureReturn;

export const SidebarDrawerContext = createContext(
  {} as SidebarDrawerContextData,
);
